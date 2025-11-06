import Component from "@glimmer/component";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class RestartComponent extends Component {
  @service session;
  @service api;
  @service eaactrl;

  @tracked isModalOpen = false;

  constructor() {
    super(...arguments);
    this.eaactrl.setEaaTargetController(this);
  }

  @action
  pressRestart() {
    this.isModalOpen = true;
    this.restart();
  }

  async restart() {
    let url = "/commands";
    let cause;
    if (this.session.data.authenticated.username === 'remote') cause = 'RemoteReboot';
    else cause = 'LocalReboot'
    try {
      let response = await this.api.customFetch(url, {
        method: "post",
        body: JSON.stringify({
          command: "Device.Reboot()",
          commandKey: "",
          sendresp: true,
          inputArgs: {
            isRelay: false,
            Cause: cause,
            Reason: 'WebGUI',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Restart HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
    } catch (error) {
      console.error(`Something went wrong during restart: ${error}`);
    }
  }
}
