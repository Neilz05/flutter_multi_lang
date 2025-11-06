import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UiDaySelectorComponent extends Component {
    @service intl;
    @service eaactrl;
    
    @tracked staticDays = [
        this.intl.t('MONDAY'), this.intl.t('TUESDAY'), this.intl.t('WEDNESDAY'), this.intl.t('THURSDAY'), this.intl.t('FRIDAY'), this.intl.t('SATURDAY'), this.intl.t('SUNDAY')
    ];

    daysStringType = this.args.daysStringType || "full";

     Days = {
        ALL: [this.intl.t('MONDAY'), this.intl.t('TUESDAY'), this.intl.t('WEDNESDAY'), this.intl.t('THURSDAY'), this.intl.t('FRIDAY'), this.intl.t('SATURDAY'), this.intl.t('SUNDAY')],
        WEEKDAYS: [this.intl.t('MONDAY'), this.intl.t('TUESDAY'), this.intl.t('WEDNESDAY'), this.intl.t('THURSDAY'), this.intl.t('FRIDAY')],
        WEEKEND: [this.intl.t('SATURDAY'), this.intl.t('SUNDAY')],
        WORKDAYS: [this.intl.t('MONDAY'), this.intl.t('TUESDAY'), this.intl.t('WEDNESDAY'), this.intl.t('THURSDAY'), this.intl.t('FRIDAY')]
    };

    get modelTimeFrame() {
        let tf = this.args.modelChangeset?.get('parameters.' + this.args.param);
        let tfMode = this.args.modelChangeset?.get('parameters.' + (this.args.paramTimeMode));
        
        //eco mode specific
        if (tfMode === 'every day') return 'every_day';
        if (tfMode === 'every workday') return 'every_workday';
        if (tfMode === 'all weekend') return 'all_weekend';
        if (tfMode === 'individual day') return 'individual_days';

        return this.classifyDayGroup(tf);
    }

    capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    classifyDayGroup(dayString) {
        const days = dayString.split(',').map(d => d.trim().toLowerCase());
        const selected = new Set(days);
        const weekdays = new Set(this.Days.WEEKDAYS);
        const weekends = new Set(this.Days.WEEKEND);
        const everyday = new Set([...weekdays, ...weekends]);

        const isEqual = (a, b) =>
        a.size === b.size && [...a].every(val => b.has(val));

        if (isEqual(selected, everyday)) return 'every_day';
        if (isEqual(selected, weekdays)) return 'every_workday';
        if (isEqual(selected, weekends)) return 'all_weekend';
        return 'individual_days';
    }
    
    @action 
    isSelected(day) {
      let _day = day.toLowerCase();
      let value = this.args.modelChangeset.get(`parameters.${this.args.param}`) || '';
      let selected = value.split(',').filter(Boolean);
      return selected.some(sel => _day.startsWith(sel.toLowerCase()));
    }

    @action
    updateDayFromSelect(event) {
    const value = event.target.value;
    const cs = this.args.modelChangeset;

    if(this.args.paramTimeMode) { //eco mode specific
        cs.set('parameters.' + this.args.paramTimeMode, 
        value === 'every_day' ? 'every day' :
        value === 'every_workday' ? 'every workday' :
        value === 'all_weekend' ? 'all weekend' : 'individual day'
        );
    }else{
      switch (value) {
        case 'every_day':
        cs.set('parameters.' + this.args.param, this.Days.ALL.join(','));
        break;
        case 'every_workday':
        cs.set('parameters.' + this.args.param, this.Days.WORKDAYS.join(','));
        break;
        case 'all_weekend':
        cs.set('parameters.' + this.args.param, this.Days.WEEKEND.join(','));
        break;
        default: // individual days (user will check manually)
        cs.set('parameters.' + this.args.param, '');
        break;
      }
    }
  }

  @action
  toggleDays(event) {
    let value = event.target.value.toLowerCase();

    const map_days = {
      'monday' : 'Mon',
      'tuesday' : 'Tue',
      'wednesday' : 'Wed',
      'thursday' : 'Thu',
      'friday' : 'Fri',
      'saturday' : 'Sat',
      'sunday' : 'Sun'
    }

    if(value in map_days && this.daysStringType !== 'full') {
      value = map_days[value];
    }

    let current = (this.args.modelChangeset.get('parameters.' + this.args.param) || '')
      .split(',')
      .filter(Boolean);

    if (event.target.checked) {
      if (!current.includes(value)) {
        current.push(value);
      }
    } else {
      current = current.filter(day => day !== value);
    }
    this.args.modelChangeset.set('parameters.' + this.args.param, current.join(','));
  }
}
