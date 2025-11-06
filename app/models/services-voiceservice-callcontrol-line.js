import Model, { attr, hasMany } from '@ember-data/model';

export default class ServicesVoiceserviceCallcontrolLineModel extends Model {
    @attr DirectoryNumber;
    @attr CallStatus;
    @attr Status;
}
