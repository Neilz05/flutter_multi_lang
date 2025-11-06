import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhoneRingSchedule extends Controller {
  @service store;
  @service parametersValidator;
  @service intl;
  @service eaactrl;

  @tracked dataArr = [];
  @tracked assignNumbers = [];
  @tracked modalHeaderText = "";
  @tracked errorMessage = "";
  @tracked modalOpen = false;
  @tracked modelChangeset;
  @tracked counter = 0;

  columns = [
      { header: this.intl.t('PAGE_RINGING_SCHEDULE_TABLE_DAY'), key: "day"},
      { header: this.intl.t('PAGE_RINGING_SCHEDULE_TABLE_TIME'), key: "time" },
      { header: this.intl.t('PAGE_RINGING_SCHEDULE_TABLE_NUMBER'), key: "number" },
      { header: this.intl.t('PAGE_RINGING_SCHEDULE_TABLE_STATUS'), key: "status" ,type: "status"},
      { header: "", key: "actions", type: "actions" }
    ];
     
  snapshot = null;

  get ringSchedulesData() {
    this.counter;
    return this.model.ring_schedules
      .filter(item => !item.markForDeletion)
      .map(e => {
          return {
            day: this.capitalizeFirstChar(e.parameters.TimeFrame),
            time: e.parameters.TimeFrom + ' to ' + e.parameters.TimeTo,
            number: e.parameters.AssignNumber,
            status: e.parameters.RingEnable,
            id: e._content._internalModel.clientId
          }
        });
  }

  get hasChanges(){
    this.counter;
    let schedIsDirty = this.model.ring_schedules.filter((e) => {
      if(!e.isDeleted)
        return e.isDirty;
    });
    return schedIsDirty.some(Boolean)||this.model.ring.isDirty;
  }

  get Enable(){
    return this.model.ring.parameters.Enable;
  }
  set Enable(value){
    this.model.ring.set('parameters.Enable', value ? 1 : 0);
  }

  get RingEnable(){
    return this.model.ring.parameters.RingEnable;
  }

  @action setRingEnable(value){
    this.model.ring.set('parameters.RingEnable', Number(value))
  }

  @action
  edit(cs) {
    this.open(cs, 'edit');
  }

  @action
  delete(cs) {
    const model = cs.get('data');
    if (model.isNew) {
        model.unloadRecord();
        this.model.ring_schedules.removeObject(cs);
        this.counter--;
    } else {
        cs.markForDeletion = true
    }
  }

  @action
  open(cs, mode) {
    this.modalOpen = mode
    this.modalHeaderText = this.intl.t('PAGE_RINGING_SCHEDULE_ADD_POPUP_TITLE');
    if (mode === 'edit') {
      this.modalHeaderText = this.intl.t('PAGE_RINGING_SCHEDULE_EDIT_POPUP_TITLE');
      this.modelChangeset = cs
      this.snapshot = cs.snapshot()
      this.assignNumbers = (cs.get('parameters.AssignNumber') || '')
        .split(',')
        .filter(Boolean);
    } else if (mode === 'add') {
      const newModel = this.store.createRecord('data', {
          parameters: {
            "TimeFrame":"",
            "TimeFrom":"00:00",
            "TimeTo":"12:00",
            "AssignNumber":""
          }
      })
      const validator = this.parametersValidator.validate({startTime:"TimeFrom",endTime:"TimeTo",days:"TimeFrame"});
      this.modelChangeset = new Changeset(newModel, lookupValidator(validator), validator, { skipValidate: true });
      this.assignNumbers = [];
    }
  }

  @action
  hideModal() {
    this.errorMessage = '';
    if (this.modalOpen === 'edit') {
      this.modelChangeset.restore(this.snapshot)
    }
  }

  @action
  updateChangeset(model, parameter, event) {
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
  addAssignNumber() {
    this.assignNumbers = [...this.assignNumbers, ""];
    this.syncAssignNumbers();
  }

  @action
  removeAssignNumber(index) {
    this.assignNumbers = this.assignNumbers.filter((_, i) => i !== index);
    this.syncAssignNumbers();
  }

  @action
  updateAssignNumber(index, event) {
    this.assignNumbers[index] = event.target.value;
    this.syncAssignNumbers();
  }

  syncAssignNumbers() {
    const value = this.assignNumbers.filter(Boolean).join(',');
    this.modelChangeset.set('parameters.AssignNumber', value);
  }

  @action
  async submitModal() {
    await this.modelChangeset.validate();
     const newSchedule = this.modelChangeset;

    if (this.checkScheduleOverlap(newSchedule, this.model.ring_schedules)) {
      this.errorMessage =  this.intl.t('ERROR_MESSAGE_SCHEDULE_OVERLAP');
      return;
    }
    if (!this.modelChangeset.isValid) {
      return;
    }

    if (this.modalOpen === 'add') {
      this.modelChangeset.execute();
      this.model.ring_schedules.pushObject(this.modelChangeset);
      this.counter++;
    }

    this.modalOpen = '';
    this.errorMessage = '';
  }

  @action
  async apply(){
    const ringService = this.model.ring;
    for (let cs of this.model.ring_schedules) {
          if (cs.markForDeletion) {
            await cs.get('data').destroyRecord().catch(() =>{});
          }
          else if (cs.isDirty) {
              await cs.get('data')
                  .applySaveChangeset(cs, 'Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.RingSchedule.')
                  .catch(() => { });
          }
    };
    if(ringService.isDirty){
      await ringService.get('data').applySaveChangeset(ringService, 'Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.').catch(() => { });
    };
  }

  @action
  cancel() {
  const schedules = [...this.model.ring_schedules];
    schedules.forEach(cs =>{
      cs.rollback();
        const model = cs.get('data');
        if (model.isNew) {
            model.unloadRecord();
            this.model.ring_schedules.removeObject(cs);
        }
    });
    this.model.ring.rollback(); 
  }

  capitalizeFirstChar(str) {
    if (!str) return "";
    return str.split(',').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(',');
  }

  checkScheduleOverlap(newSchedule, allSchedules) {
    const newDays = newSchedule.parameters.TimeFrame.split(',');
    const from = newSchedule.parameters.TimeFrom;
    const to = newSchedule.parameters.TimeTo;
    const id = newSchedule.id;

    const toMinutes = (time) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };
    const newStart = toMinutes(from);
    const newEnd = toMinutes(to);

    return allSchedules.some((schedule) => {
      if (schedule.markForDeletion) return false;
      if (schedule.id === id) return false;

      const existingDays = schedule.parameters.TimeFrame.split(',');
      const dayOverlap = newDays.some(day => existingDays.includes(day));
      if (!dayOverlap) return false;
      const start = toMinutes(schedule.parameters.TimeFrom);
      const end = toMinutes(schedule.parameters.TimeTo);

      return newStart < end && newEnd > start;
    });
  }

}
