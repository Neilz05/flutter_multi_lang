import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import ScheduleValidator from '../../../validations/wifi-schedule';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import config from 'prpl-webui/config/environment';


export default class AuthenticatedWifiScheduleController extends Controller {
    @service store
    @service eaactrl;
    
    @tracked modelType = config.APP.modelType || 'Neutral';
    // additional data for selected schedule model
    @tracked ModalOpen = false
    @tracked ModalHeaderText = ''
    @tracked ModelChangeset
    @tracked ModelTimeFrame
    @tracked ModelEndTime

    @tracked AddCounter = 0

    snapshot = null
    static_days_list = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    get Schedules() {
        this.AddCounter
        return this.model.schedules.filter((e) => {
            //console.log(e)
            return !e.markForDeletion
        })
    }

    DaysList(dayString) {
        return dayString.split(',').map(day => day.charAt(0).toUpperCase() + day.slice(1)).filter(Boolean).join(', ');
    }

    @action
    UpdateChangeset(model, parameter, event) {
        if (event.target.type === 'checkbox') {
            model.set(parameter, event.target.checked ? 1 : 0)
        }
        if (event.target.type === 'text' || event.target.type === 'time') {
            model.set(parameter, event.target.value)
        }
        if (event.target.type === 'radio') {
            model.set(parameter, Number(event.target.value))
        }

    }

    @action
    UpdateDayFromSelect(event) {
        this.ModelTimeFrame = event.target.value;

        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        const weekends = ['saturday', 'sunday'];

        switch (event.target.value) {
            case 'every_day':
                this.ModelChangeset.set('parameters.Day', this.static_days_list.join(','));
                break;

            case 'every_weekday':
            case 'every_workday': // handle both terms the same
                this.ModelChangeset.set('parameters.Day', weekdays.join(','));
                break;

            case 'all_weekend':
                this.ModelChangeset.set('parameters.Day', weekends.join(','));
                break;
        }
    }

    UpdateDuration() {
        const endTime = this.ModelEndTime; // e.g., "01:30"
        const startTime = this.ModelChangeset.get('parameters.StartTime'); // e.g., "23:45"

        if (!startTime || !endTime) {
            this.ModelChangeset.set('parameters.Duration', null)
            return
        }

        let [sh, sm] = startTime.split(':').map(Number);
        let [eh, em] = endTime.split(':').map(Number);

        // Convert both to total seconds
        const startSeconds = sh * 3600 + sm * 60;
        const endSeconds = eh * 3600 + em * 60;

        let duration;

        // Handle time wrapping past midnight
        if (endSeconds >= startSeconds) {
            duration = endSeconds - startSeconds;
        } else {
            duration = (86400 - startSeconds) + endSeconds;
        }
        //console.log(`${endTime} - ${startTime} = ${duration} seconds`)

        this.ModelChangeset.set('parameters.Duration', duration)
    }

    @action
    ToggleDays(event) {
        const value = event.target.value.toLowerCase();
        let current = (this.ModelChangeset.get('parameters.Day') || '').split(',').filter(Boolean);

        if (event.target.checked) {
            // Add the day only if not already present
            if (!current.includes(value)) {
                current.push(value);
            }
        } else {
            // Remove the day if unchecked
            current = current.filter(day => day !== value);
        }

        this.ModelChangeset.set('parameters.Day', current.join(','))
    }



    @action
    Open(cs, mode) {
        this.ModalOpen = mode

        if (mode === 'edit') {
            this.ModalHeaderText = 'Edit WiFi Schedule'
            this.ModelChangeset = cs
            this.ModelTimeFrame = this.classifyDayGroup(cs.get('parameters.Day'))
            this.snapshot = cs.snapshot()
        }

        if (mode === 'add') {
            const newModel = this.store.createRecord('data', {
                parameters: {
                    Alias: '',
                    Day: 'monday',
                    StartTime: '00:00',
                    Duration: 3600,
                    Enable: 1
                }
            })

            this.ModelTimeFrame = 'individual_days' // no need to recompute. haha
            this.ModalHeaderText = 'Add WiFi Schedule'

            const validator = ScheduleValidator(this.store, 'Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.')
            this.ModelChangeset = new Changeset(newModel, lookupValidator(validator), validator, { skipValidate: true });
            //const changeset = new Changeset(newModel, lookupValidator(validator), validator);
        }

        // derive the end time from duration 
        let [sh, sm] = this.ModelChangeset.get('parameters.StartTime').split(':').map(Number);
        let startSeconds = sh * 3600 + sm * 60;
        let totalSeconds = startSeconds + this.ModelChangeset.get('parameters.Duration');
        let endHours = Math.floor(totalSeconds / 3600) % 24;
        let endMinutes = Math.floor((totalSeconds % 3600) / 60);

        const pad = (n) => String(n).padStart(2, '0');

        this.ModelEndTime = `${pad(endHours)}:${pad(endMinutes)}`
    }

    @action
    async SubmitModal() {

        this.UpdateDuration()
        await this.ModelChangeset.validate()

        if (!this.ModelChangeset.isValid) {
            return; // Stop if there are validation errors
        }

        if (this.ModalOpen === 'add') {
            this.ModelChangeset.execute()
            this.model.schedules.pushObject(this.ModelChangeset);
            this.AddCounter++
        }

        this.ModalOpen = '';
    }

    @action
    Delete(cs) {
        const model = cs.get('data');

        if (model.isNew) {
            // Model was never saved to the backend
            model.unloadRecord(); // Just removes it from memory
            this.model.schedules.removeObject(cs);
            this.AddCounter--
        } else {
            // mark the changeset for deletion
            cs.markForDeletion = true
        }

        //this.model.schedules.removeObject(cs);
    }

    @action
    HideModal() {

        if (this.ModalOpen === 'edit') {
            this.ModelChangeset.restore(this.snapshot)
        }

    }

    @action
    async Apply() {
        for (let cs of this.model.schedules) {
            if (cs.markForDeletion) {
                await cs.get('data').destroyRecord().catch(() => { });
            }
            else if (cs.isDirty) {
                await cs.get('data')
                    .applySaveChangeset(cs, 'Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.')
                    .catch(() => { });
            }
        }

        const wifischeduler = this.model.wifischeduler
        if (wifischeduler.isDirty) {
            await wifischeduler.get('data').applySaveChangeset(wifischeduler, `Device.X_PRPL-COM_WiFiScheduler.`)
        }

        const x_sc_schedule = this.model.x_sc_schedule
        if (x_sc_schedule.isDirty) {
            await x_sc_schedule.get('data').applySaveChangeset(x_sc_schedule, `Device.WiFi.X_SC_Schedule.`)
        }

        //window.location.reload()
    }

    @action
    Cancel() {
        const schedules = [...this.model.schedules];

        for (let cs of schedules) {
            cs.rollback();

            const model = cs.get('data');
            if (model.isNew) {
                model.unloadRecord();
                this.model.schedules.removeObject(cs); // ✅ Remove changeset from array
            }
        }

        this.model.wifischeduler.rollback()
        this.model.x_sc_schedule.rollback()
    }

    classifyDayGroup(dayString) {
        if (!dayString || typeof dayString !== 'string') return 'Invalid';

        const days = dayString.split(',').map(d => d.trim().toLowerCase());
        const selected = new Set(days);

        const weekdays = new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
        const weekends = new Set(['saturday', 'sunday']);
        const everyday = new Set([...weekdays, ...weekends]);

        const isEqual = (a, b) =>
            a.size === b.size && [...a].every(val => b.has(val));

        if (isEqual(selected, everyday)) return 'every_day';
        if (isEqual(selected, weekdays)) return 'every_workday';
        if (isEqual(selected, weekends)) return 'all_weekend';

        return 'individual_days'; // individual day or mix
    }

    /* get ValidModelChangeset() {
        return this.ModelChangeset.isValid
    } */

    get HasChanges() {
        this.AddCounter
        return this.model.schedules.find(e => e.isDirty) || this.model.wifischeduler.isDirty || this.model.x_sc_schedule.isDirty || this.model.schedules.find(e => e.data.isDeleted)
        //return this.store.peekAll('data').find((e) => e.hasDirtyAttributes)
    }
}