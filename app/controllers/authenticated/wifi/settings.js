import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedWifiSettingsController extends Controller {
  @service store;
  @service eaactrl;
  //luis L. - 06/27/2025

  @tracked hasComponentErrors = false;
  @tracked componentReference = [];
  @tracked componentErrors = new Map();

  get Radios() {
    return this.store.peekAll('wifi-radio');
  }

  get Wl0WiFi() {
    return this.Radios.find(radio => radio.Alias === 'Wl0');
  }

  get Wl1WiFi() {
    return this.Radios.find(radio => radio.Alias === 'Wl1');
  }

  get Wl2WiFi() {
    return this.Radios.find(radio => radio.Alias === 'Wl2');
  }

  @action
  async updateWiFiSettings() {
    if (this.Wl1WiFi?.hasDirtyAttributes) {
      this.Wl1WiFi.save()/* .then(() => window.location.reload()); */
    }

    let wl1DriverConfig = await this.Wl1WiFi?.DriverConfig;
    if (wl1DriverConfig?.get('hasDirtyAttributes')) {
      wl1DriverConfig.save()/* .then(() => window.location.reload()); */
    }

    if (this.Wl0WiFi?.hasDirtyAttributes) {
      this.Wl0WiFi.save()/* .then(() => window.location.reload()); */
    }

    let wl0DriverConfig = await this.Wl0WiFi?.DriverConfig;
    if (wl0DriverConfig?.get('hasDirtyAttributes')) {
      wl0DriverConfig.save()/* .then(() => window.location.reload()); */
    }

    if (this.Wl2WiFi?.hasDirtyAttributes) {
      this.Wl2WiFi.save()/* .then(() => window.location.reload()); */
    }

    let wl2DriverConfig = await this.Wl2WiFi?.DriverConfig;
    if (wl2DriverConfig?.get('hasDirtyAttributes')) {
      wl2DriverConfig.save()/* .then(() => window.location.reload()); */
    }
  }

  @action
  async cancelWifiSettings() {
    if (this.Wl1WiFi?.hasDirtyAttributes) this.Wl1WiFi.rollbackAttributes();

    let wl1DriverConfig = await this.Wl1WiFi?.DriverConfig;
    if (wl1DriverConfig?.get('hasDirtyAttributes')) {
      wl1DriverConfig.rollbackAttributes();
    }

    if (this.Wl0WiFi?.hasDirtyAttributes) this.Wl0WiFi.rollbackAttributes();

    let wl0DriverConfig = await this.Wl0WiFi?.DriverConfig;
    if (wl0DriverConfig?.get('hasDirtyAttributes')) {
      wl0DriverConfig.rollbackAttributes();
    }

    if (this.Wl2WiFi?.hasDirtyAttributes) this.Wl2WiFi.rollbackAttributes();

    let wl2DriverConfig = await this.Wl2WiFi?.DriverConfig;
    if (wl2DriverConfig?.get('hasDirtyAttributes')) {
      wl2DriverConfig.rollbackAttributes();
    }

    this.componentReference.forEach((component) => {
      component?.clearAllErrorMsgs?.();
    });
  }

  get hasChanges() {
    return (
      this.Wl1WiFi?.hasDirtyAttributes ||
      this.Wl1WiFi?.DriverConfig?.get('hasDirtyAttributes') ||
      this.Wl0WiFi?.hasDirtyAttributes ||
      this.Wl0WiFi?.DriverConfig?.get('hasDirtyAttributes') ||
      this.Wl2WiFi?.hasDirtyAttributes ||
      this.Wl2WiFi?.DriverConfig?.get('hasDirtyAttributes')
    ) && !this.hasComponentErrors;
  }

  @action
  updateComponentErrors(componentID, hasErrors) {
    const errorMap = new Map(this.componentError);
    errorMap.set(componentID, hasErrors);
    this.componentError = errorMap;

    // check if any of the components returns at least one 'true' boolean value
    this.hasComponentErrors = Array.from(this.componentError.values()).some(Boolean);
  }

  @action
  registerClearErrors(componentInstance) {
    this.componentReference.push(componentInstance);
  }
}
