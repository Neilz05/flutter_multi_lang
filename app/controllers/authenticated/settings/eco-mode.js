import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default class AuthenticatedSettingsEcoModeController extends Controller {
  @service store;
  @service intl;
  @service parametersValidator;

  @tracked hasChangesFlag = false;
  @tracked modelChangeset;
  @tracked modalOpen = false;
  @tracked data = [];
  @tracked errorMessage = "";
  @tracked modalHeaderText = "";
  @tracked counter = 0;
  @tracked isApplying = false;

  snapshot = null;

  columns = [
    { header: this.intl.t('PAGE_SETTINGS_ECO_MODE_TABLE_HEADER_COL2'), key: "day" },
    { header: this.intl.t('PAGE_SETTINGS_ECO_MODE_TABLE_HEADER_COL1'), key: "time-frame"},
    { header: this.intl.t('PAGE_SETTINGS_ECO_MODE_TABLE_HEADER_COL3'), key: "enable", type: "status" },
    { header: this.intl.t('PAGE_SETTINGS_ECO_MODE_TABLE_HEADER_COL4'), key: "mode-type" },
    { header: this.intl.t('PAGE_SETTINGS_ECO_MODE_TABLE_HEADER_COL5'), key: "name" },
    { header: "", key: "actions", type: "actions" }
  ];

  get ecoSchedData() {
    this.counter;
    return this.model.eco_schedule
        .filter(item => !item.markForDeletion)
        .map(item => {
            const params = item.parameters;
            return {
                'time-frame': `${params.StartTime} to ${params.EndTime}`,
                'day': this.daysMap(params),
                'enable': params.Enable ?? false,
                'mode-type': params.ModeEnabled ?? false,
                'name': params.Name,
                'mode': params.Mode,
                'id': item._content._internalModel.clientId
            };
        });
    }

  get ecoModeOptions(){
    return [
      {label: this.intl.t('PAGE_SETTINGS_ECO_MODE_TYPE_LIGHT'), key: 'light'},
      {label: this.intl.t('PAGE_SETTINGS_ECO_MODE_TYPE_DEEP'), key: 'deep'},
      {label: this.intl.t('PAGE_SETTINGS_ECO_MODE_TYPE_CUSTOM'), key: 'customized'}
    ];
  }
  get ecoMode(){
    return this.model.eco.parameters.ModeEnabled || 'light';
  }

  @action
  updateEcoMode(value) {
    this.model.eco.set('parameters.ModeEnabled', value);
  }

  get ecoModeToggle(){
    if(this.model.eco.length == 0) return false;
    return this.model.eco.parameters.Enable === 1 ? true : false;
  }

  set ecoModeToggle(value) {
   this.model.eco.set('parameters.Enable', value ? 1 : 0)
  }

  get hasChanges() {
    this.counter;
    let schedDirty = this.model.eco_schedule.filter(cs => !cs.isDeleted).some(cs => cs.isDirty);
    return this.model.eco.isDirty || schedDirty;
  }
  
  @action edit(item){
    this.open(item, 'edit');
  }

  @action open(item,mode){
    this.modalOpen = mode;
    this.modalHeaderText = this.intl.t('PAGE_SETTINGS_ECO_MODE_POPUP_HEADER_ADD');
    if(mode === 'edit'){
      this.modalHeaderText = this.intl.t('PAGE_SETTINGS_ECO_MODE_POPUP_HEADER_EDIT');
      this.modelChangeset = item;
      this.snapshot = item.snapshot();
    }else if(mode === 'add'){
      const newModel = this.store.createRecord('data', {
          parameters: {
            "WeekDay":"Mon",
            "Enable":0,
            "ModeEnabled":'light',
            "Mode":"every day",
            "Name":"",
            "StartTime":"00:00",
            "EndTime":"12:00",
          }
      });
      const validator = this.parametersValidator.validate({startTime:"StartTime",endTime:"EndTime",days:"WeekDay",name:"Name"});
      this.modelChangeset = new Changeset(newModel, lookupValidator(validator), validator, { skipValidate: true });
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

  @action updateModeTypeSchedRule(value) {
    this.modelChangeset.set('parameters.ModeEnabled', value); 
  }

  @action
  async submitModal() {
    await this.modelChangeset.validate();
    const newSchedule = this.modelChangeset;

    if (this.checkScheduleOverlap(newSchedule, this.model.eco_schedule)) {
      this.errorMessage =  this.intl.t('ERROR_MESSAGE_SCHEDULE_OVERLAP');
      return;
    }

    if (!this.modelChangeset.isValid) {
      return;
    }

    if (this.modalOpen === 'add') {
      this.modelChangeset.execute();
      this.model.eco_schedule.pushObject(this.modelChangeset);
      this.counter++;
    }

    this.modalOpen = '';
    this.errorMessage = '';
    this.hasChangesFlag = true;
  }

  @action
  cancel() {
  const schedules = [...this.model.eco_schedule];
    schedules.forEach(cs =>{
      cs.rollback();
        const model = cs.get('data');
        if (model.isNew) {
            model.unloadRecord();
            this.model.eco_schedule.removeObject(cs);
        }
    });
    this.model.eco.rollback();
  }

  
  @action
  delete(cs) {
    const model = cs.get('data');
    if (model.isNew) {
        model.unloadRecord(); 
        this.model.eco_schedule.removeObject(cs);
        this.counter--;
    } else {
        cs.markForDeletion = true;
    }
  }

  @action
  async apply(){
    if(this.model.eco.isDirty){
      await this.model.eco.get('data')
          .applySaveChangeset(this.model.eco, 'Device.X_ECO.')
          .catch(() => { });
    }
    for (let cs of this.model.eco_schedule) {
      if (cs.markForDeletion) {
          await cs.get('data').destroyRecord().catch(() => { });
          
      }
      else if (cs.isDirty) {
          await cs.get('data')
              .applySaveChangeset(cs, 'Device.X_ECO.ScheduleRule.')
              .catch(() => { });
      }
    };
    this.isApplying = false;
  }

  @action 
  applyChanges(){
    this.isApplying = true;
  }

  @action
  hideModal() {
    this.errorMessage = '';
    if (this.modalOpen === 'edit') {
      this.modelChangeset.restore(this.snapshot)
    }
  }

  checkScheduleOverlap(newSchedule, allSchedules) {
    const mode = newSchedule.parameters.Mode;
    const from = newSchedule.parameters.StartTime;
    const to = newSchedule.parameters.EndTime;
    const id = newSchedule.id;

    const toMinutes = (time) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    // Define weekday groups per mode
    const modeDaysMap = {
      'every day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      'every workday': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      'all weekend': ['Sat', 'Sun'],
    };

    // Resolve new schedule days
    const newDays =
      mode === 'individual day'
        ? newSchedule.parameters.WeekDay.split(',')
        : modeDaysMap[mode] || [];

    const newStart = toMinutes(from);
    const newEnd = toMinutes(to);

    return allSchedules.some((schedule) => {
      if (schedule.markForDeletion) return false;
      if (schedule.id === id) return false;

      const existingMode = schedule.parameters.Mode;
      const existingDays =
        existingMode === 'individual day'
          ? schedule.parameters.WeekDay.split(',')
          : modeDaysMap[existingMode] || [];

      // Check if any days overlap (including mode <-> individual combinations)
      const dayOverlap = newDays.some((day) => existingDays.includes(day));
      if (!dayOverlap) return false;

      const start = toMinutes(schedule.parameters.StartTime);
      const end = toMinutes(schedule.parameters.EndTime);

      return newStart < end && newEnd > start;
    });
  }

  capitalizeFirstChar(str) {
    if (!str) return "";
    return str.split(',').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(',');
  }

  daysMap(params) {
    if(params.Mode === 'every day') return this.intl.t('SCHEDULE_EVERYDAY');
    if(params.Mode === 'every workday') return this.intl.t('SCHEDULE_WEEKDAYS');
    if(params.Mode === 'all weekend') return this.intl.t('SCHEDULE_WEEKEND');
    if(params.Mode === 'individual day') return this.capitalizeFirstChar(params.WeekDay);
    return this.capitalizeFirstChar(params.WeekDay);

  }
}
