import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import AccessControlValidator from '../../../validations/hosts-accesscontrol';
import AccessControlURLValidator from '../../../validations/hosts-accesscontrol-url';
import AccessControlAppValidator from '../../../validations/hosts-accesscontrol-app';
import AccessControlScheduleValidator from '../../../validations/hosts-accesscontrol-schedule';
import { mode } from 'sjcl';

export default class AuthenticatedParentalController extends Controller {
    @service eaactrl
    @service store
    @service api

    static_days_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    @tracked Mode = ''
    @tracked SelectedModel
    @tracked ModalHeaderText = ''

    @tracked AccessControlErrors
    @tracked ScheduleErrors = []
    @tracked URLErrors = []
    @tracked ApplicationErrors = []


    get entries() {
        return this.model.filter((e) => !e.isDeleted)
    }

    get FilteredURLs() {
        return this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs.filter((e) => !e.isDeleted)
    }

    get FilteredApplications() {
        return this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications.filter((e) => !e.isDeleted)
    }

    get FilteredSchedules() {
        return this.SelectedModel.Schedule.filter((e) => !e.isDeleted)
    }

    get AvailableHosts() {
        const hosts = this.store.peekAll('hosts-host')
            .filter(host => host.HostName && host.PhysAddress);

        const groupByIdentityKey = new Map();
        const finalHostsList = [];

        hosts.forEach(host => {
            const key = host.X_RMDIP_IdentityKey;

            // Check first if the host has a X_RMDIP_IdentityKey
            if (key) {
                // If there is and it is not yet part of the mapping, add it to the map
                if (!groupByIdentityKey.has(key)) {
                    groupByIdentityKey.set(key, []);
                }
                groupByIdentityKey.get(key).push(host);
            } else {
                // If no key, add it to the final list of hosts
                finalHostsList.push(host);
            }
        });

        for (const [key, group] of groupByIdentityKey.entries()) {
            // If there is only 1 host in the group with a X_RMDIP_IdentityKey, then add it to the final list
            if (group.length === 1) {
                finalHostsList.push(group[0]);
            } else {
                // If there are more than 1 hosts in the group that have the same X_RMDIP_IdentityKey,
                // find the entry with an Active status of "1"
                // or if none, choose the first entry
                const activeHost = group.find(entry => entry.Active === 1);
                finalHostsList.push(activeHost || group[0]);
            }
        }

        return finalHostsList;
    }

    @action
    UpdateMAC(index, event) {

        // maybe add the selected model to the parameter function?
        let address = this.SelectedModel.PhysAddress.split(':')
        address[index] = event.target.value.toUpperCase().replace(/[^A-F0-9]/g, '')
        this.SelectedModel.PhysAddress = address.join(':')

        if (event.target.value.length === 2 && index < 5) {
            const nextInput = document.querySelector(`#macinput-${index + 1}`);

            if (nextInput) {
                nextInput.focus();
                nextInput.select(); // Optional: select text for quick overwrite
            }
        }

        if (event.inputType === 'deleteContentBackward' && address[index].length === 0 && index > 0) {
            const prevInput = document.querySelector(`#macinput-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
                prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
            }
        }
    }

    get HasChanges() {
        return this.model.find((cs) => {
            return cs.hasDirtyAttributes ||
                cs.isDeleted ||
                cs.Schedule.find((sch => sch.hasDirtyAttributes || sch.isDeleted)) ||
                cs.get('X_PRPLWARE-COM_ApplicationFilter').hasDirtyAttributes ||
                cs.get('X_PRPLWARE-COM_URLFilter').hasDirtyAttributes ||
                cs.get('X_PRPLWARE-COM_ApplicationFilter').Applications.find((app => app.hasDirtyAttributes || app.isDeleted)) ||
                cs.get('X_PRPLWARE-COM_URLFilter').URLs.find((url => url.hasDirtyAttributes || url.isDeleted));
        })
    }

    @action
    toggle(model, param) {
        model[param] = model[param] === 1 ? 0 : 1;
    }

    @action
    select(model, param, event) {
        model[param] = event.target.value;
    }

    @action
    Delete(entry) {
        this.entries.removeObject(entry);
        if (entry.isNew) {
            entry.unloadRecord();
        } else {
            entry.deleteRecord();
        }
    }

    @action
    DeleteURLFilter(filter) {
        if (filter.isNew) {
            filter.unloadRecord();
        } else {
            filter.deleteRecord();
        }
    }

    @action
    DeleteApplicationFilter(filter) {
        this.DeleteURLFilter(filter)
    }

    @action
    DeleteSchedule(schedule) {
        this.DeleteURLFilter(schedule)
    }

    @action
    Edit(entry) {
        this.SelectedModel = entry
        console.log(entry)
        this.Mode = 'edit'
        this.ModalHeaderText = 'Edit Selected Parental Rule'
    }

    @action
    UpdateDays(cs, event) {
        const value = event.target.value
        let current = (cs.Day || '').split(',').filter(Boolean);

        if (event.target.checked) {
            // Add the day only if not already present
            if (!current.includes(value)) {
                current.push(value);
            }
        } else {
            // Remove the day if unchecked
            current = current.filter(day => day !== value);
        }

        cs.Day = current.join(',')
    }

    @action
    UpdateDuration(cs, event) {

        const endTime = event.target.value; // e.g., "01:30"
        const startTime = cs.StartTime; // e.g., "23:45"

        if (!startTime || !endTime) {
            cs.Duration = ""
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

        cs.Duration = duration
    }

    @action
    CancelChanges() {

        const urls = this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs;
        if (urls) urls.forEach((url) => url.rollbackAttributes());

        const apps = this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications;
        if (apps) apps.forEach((app) => app.rollbackAttributes());

        const schedules = this.SelectedModel.Schedule;
        if (schedules) schedules.forEach((schedule) => schedule.rollbackAttributes());

        const applicationFilter = this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter');
        if (applicationFilter) applicationFilter.rollbackAttributes();

        const urlFilter = this.SelectedModel.get('X_PRPLWARE-COM_URLFilter');
        if (urlFilter) urlFilter.rollbackAttributes();

        this.SelectedModel.rollbackAttributes();

        /* if (this.Mode === 'edit') {
            // Restore the changesets to their previous state
            this.SelectedModel.rollbackAttributes();

            // restore the child objects.

            this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').rollbackAttributes();
            this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').rollbackAttributes();

            this.SelectedModel.Schedule.forEach((schedule) => {
                schedule.rollbackAttributes();
            })

            this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications.forEach((app) => {
                app.rollbackAttributes();
            })

            this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs.forEach((url) => {
                url.rollbackAttributes();
            })
        }
        if (this.Mode === 'add') {
            //unload the child objects first
            this.SelectedModel.Schedule.forEach((schedule) => {
                if (schedule) schedule.unloadRecord()
            })

            this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications.forEach((app) => {
                if (app) app.unloadRecord()
            })
            this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs.forEach((url) => {
                if (url) url.unloadRecord()
            })

            this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').unloadRecord()
            this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').unloadRecord()



            // only now we unload.
            this.SelectedModel.unloadRecord()
        } */
        this.Mode = '';
        this.AccessControlErrors = null
        this.ScheduleErrors = []
        this.URLErrors = []
        this.ApplicationErrors = []
    }

    @action
    async SubmitChanges() {
        this.AccessControlErrors = null
        this.ScheduleErrors = []
        this.URLErrors = []
        this.ApplicationErrors = []

        let hasErrors = false

        const validator = AccessControlValidator()
        const urlvalidator = AccessControlURLValidator()
        const appvalidator = AccessControlAppValidator()
        const schvalidator = AccessControlScheduleValidator(this.SelectedModel.Schedule)

        // === Validate Access Control itself ===
        this.AccessControlErrors = new Changeset(this.SelectedModel, lookupValidator(validator), validator, { skipValidate: true })
        await this.AccessControlErrors.validate()
        if (Object.keys(this.AccessControlErrors.error || {}).length > 0) {
            hasErrors = true
        }

        if (this.SelectedModel.AccessPolicy === 'Allow') {
            // === Validate schedules ===
            const scheduleValidations = this.SelectedModel.Schedule.map(async (schedule) => {
                const schChangeset = new Changeset(schedule, lookupValidator(schvalidator), schvalidator, { skipValidate: true })
                await schChangeset.validate()
                this.ScheduleErrors = [...this.ScheduleErrors, schChangeset.error]
                if (Object.keys(schChangeset.error || {}).length > 0) hasErrors = true
            })
            await Promise.all(scheduleValidations)
        }

        if (this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').Enable) {
            // === Validate URLs ===
            const urlValidations = this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs.map(async (url) => {
                const urlChangeset = new Changeset(url, lookupValidator(urlvalidator), urlvalidator, { skipValidate: true })
                await urlChangeset.validate()
                this.URLErrors = [...this.URLErrors, urlChangeset.error]
                if (Object.keys(urlChangeset.error || {}).length > 0) hasErrors = true
            })
            await Promise.all(urlValidations)
        }

        if (this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Enable) {
            // === Validate Applications ===
            const appValidations = this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications.map(async (app) => {
                const appChangeset = new Changeset(app, lookupValidator(appvalidator), appvalidator, { skipValidate: true })
                await appChangeset.validate()
                this.ApplicationErrors = [...this.ApplicationErrors, appChangeset.error]
                if (Object.keys(appChangeset.error || {}).length > 0) hasErrors = true
            })
            await Promise.all(appValidations)
        }



        if (!hasErrors) {
            this.Mode = ''
            this.AccessControlErrors = null
            this.ScheduleErrors = []
            this.URLErrors = []
            this.ApplicationErrors = []
        }
    }


    @action
    AddAccessControl() {
        this.SelectedModel = this.store.createRecord('hosts-accesscontrol', {
            AccessPolicy: 'Allow',
            Enable: 0,
            HostName: "",
            "X_PRPLWARE-COM_URLFilter": this.store.createRecord('hosts-accesscontrol-xprplwarecomurlfilter', { Enable: 0 }),
            "X_PRPLWARE-COM_ApplicationFilter": this.store.createRecord('hosts-accesscontrol-xprplwarecomapplicationfilter', { Enable: 0 })
        })
        this.model.pushObject(this.SelectedModel)
        this.Mode = 'add';
        this.ModalHeaderText = 'Add New Parental Rule'
    }

    @action
    AddUrlFilter() {
        this.SelectedModel.get('X_PRPLWARE-COM_URLFilter').URLs.pushObject(this.store.createRecord('hosts-accesscontrol-xprplwarecomurlfilter-urls'));
    }

    @action
    AddApplicationFilter() {
        this.SelectedModel.get('X_PRPLWARE-COM_ApplicationFilter').Applications.pushObject(this.store.createRecord('hosts-accesscontrol-xprplwarecomapplicationfilter-applications'));
    }

    @action
    AddSchedule() {
        // default value.
        this.SelectedModel.Schedule.pushObject(this.store.createRecord('hosts-accesscontrol-schedule', {
            Day: 'Monday',
            StartTime: '00:00',
            Duration: 3600,
            Enable: 1
        }));
    }



    saveSchedules(entry) {
        const schedules = entry.Schedule;
        if (!schedules) return;

        schedules.forEach((schedule) => {
            if (schedule.isNew) {
                schedule.save({ adapterOptions: { customID: `Device.${entry.id}Schedule.` } });
            } else if (schedule.hasDirtyAttributes || schedule.isDeleted) {
                schedule.save();
            }
        })
    }

    saveApplicationFilterEntries(entry) {
        const appEntries = entry.get('X_PRPLWARE-COM_ApplicationFilter').Applications;
        if (!appEntries) return;

        //applications
        appEntries.forEach((app) => {
            if (app.isNew) {
                app.save({ adapterOptions: { customID: `Device.${entry.id}X_PRPLWARE-COM_ApplicationFilter.Applications.` } });
            } else if (app.hasDirtyAttributes || app.isDeleted) {
                app.save();
            }
        })
    }

    saveURLFilterEntries(entry) {
        const urlEntries = entry.get('X_PRPLWARE-COM_URLFilter').URLs;
        if (!urlEntries) return;

        urlEntries.forEach((url) => {
            if (url.isNew) {
                url.save({ adapterOptions: { customID: `Device.${entry.id}X_PRPLWARE-COM_URLFilter.URLs.` } });
            } else if (url.hasDirtyAttributes || url.isDeleted) {
                url.save();
            }
        })
    }

    @action
    Apply() {
        this.model.forEach((entry) => {
            //accesscontrol model
            if (entry.isNew) {
                entry.save().then(model => {
                    console.log('Newly created model', model)

                    model.get('X_PRPLWARE-COM_ApplicationFilter').save({ adapterOptions: { customID: `${model.id.slice(0, -1)}` } }).then(appfilter => {
                        console.log('result: ', appfilter, appfilter.id)
                        if (appfilter.Enable) {
                            this.api.customFetch(`/serviceElements/Device.${appfilter.id}`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    Enable: 1,
                                })
                            }).then(() => { });
                        }
                    })
                    model.get('X_PRPLWARE-COM_URLFilter').save({ adapterOptions: { customID: `${model.id.slice(0, -1)}` } }).then(urlfilter => {
                        console.log('result: ', urlfilter, urlfilter.id)
                        if (urlfilter.Enable) {
                            this.api.customFetch(`/serviceElements/Device.${urlfilter.id}`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    Enable: 1,
                                })
                            }).then(() => { });
                        }
                    })

                    this.saveSchedules(entry);
                    this.saveApplicationFilterEntries(entry);
                    this.saveURLFilterEntries(entry);
                });
            } else if (entry.isDeleted) {
                entry.Schedule.forEach((schedule) => {
                    if (schedule) schedule.unloadRecord()
                })
                entry.get('X_PRPLWARE-COM_ApplicationFilter').Applications.forEach((app) => {
                    if (app) app.unloadRecord()
                })
                entry.get('X_PRPLWARE-COM_URLFilter').URLs.forEach((url) => {
                    if (url) url.unloadRecord()
                })
                entry.get('X_PRPLWARE-COM_ApplicationFilter')?.unloadRecord()
                entry.get('X_PRPLWARE-COM_URLFilter')?.unloadRecord()
                entry.save()
                this.model.removeObject(entry);
            } else if (entry.hasDirtyAttributes) {
                entry.save();
            }

            if (!entry.isDeleted && !entry.isNew) {
                this.saveSchedules(entry);
                this.saveApplicationFilterEntries(entry);
                this.saveURLFilterEntries(entry);

                if (entry.get('X_PRPLWARE-COM_ApplicationFilter').hasDirtyAttributes) entry.get('X_PRPLWARE-COM_ApplicationFilter').save();
                if (entry.get('X_PRPLWARE-COM_URLFilter').hasDirtyAttributes) entry.get('X_PRPLWARE-COM_URLFilter').save();

            }
        })
    }
}
