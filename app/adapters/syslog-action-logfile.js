import ApplicationAdapter from './application';

export default class SyslogActionLogFileAdapter extends ApplicationAdapter {
  urlForFindAll(id, modelName, snapshot) {
    return `/${this.namespace}Syslog.Action.*.LogFile.`
  }
}
