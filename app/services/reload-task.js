
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ReloadTaskService extends Service {
  @tracked intervalId = null;

  startTask() {
    if (!this.intervalId) {
      this.scheduleTask();
    }
  }

  scheduleTask() {
    this.intervalId = setTimeout(() => {
      window.location.reload();
      this.scheduleTask();
    }, 5000);
  }

  stopTask() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }
}
