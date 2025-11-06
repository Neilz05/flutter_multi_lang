import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UiTableComponent extends Component {
  @service eaactrl;
  
  componentId = this.eaactrl.getRandomString(16);

  get componentId() {
      return this.componentId;
  }

  @action
  onEdit(row) {
      this.args.onEdit(this.trackRows(this.args.model, row.id));
  }

  @action onDelete(row) {
    this.args.onDelete(this.trackRows(this.args.model, row.id));
  }

  trackRows(model, id){
    return model.map((e) => {
        let clientId = e._content._internalModel.clientId;
          if (clientId === id) {
              return e;
          }
      }).filter(Boolean)[0]
    };
  }