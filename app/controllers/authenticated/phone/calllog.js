import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service, { inject as service } from '@ember/service';

export default class AuthenticatedCallLogController extends Controller {
    @service store
    @service api

    @tracked filter = 'all'
    @tracked checkAll = false
    @tracked index = []
    @tracked page = 1
    @tracked selectedNumber = 'all'

    // arbitrary value, ask fw team for this.
    // determines the number of call logs displayed per page.
    limit = 10

    get Clients(){
        // get all the unique numbers in the logs
        return this.model.calllog.map(call => call.CallingPartyNumber).filter((value, index, self) => self.indexOf(value) === index);
    }

    get FilteredLogs() {
        // display only <limit> records per page.
        let logs = this.model.calllog;
        if (this.filter === 'dialled') {
            logs = logs.filter(call => call.Direction === 'Outgoing')
        }
        else if (this.filter === 'received') {
            logs = logs.filter(call => call.Direction === 'Incoming' && Number(call.Duration) !== 0);
        }
        else if (this.filter === 'missed') {
            logs = logs.filter(call => call.Direction === 'Incoming' && Number(call.Duration) === 0);
        }
        else {
            logs = logs;
        }

        if (this.selectedNumber !== 'all'){
            logs = logs.filter(call => call.CallingPartyNumber === this.selectedNumber);
        }

        return logs
    }

    get PaginatedFilterLogs() {
        return this.FilteredLogs.slice((this.page - 1) * this.limit, this.page * this.limit)
    }

    get TotalPages() {
        return Math.ceil(this.FilteredLogs.length / this.limit);
    }

    get DeletedCount(){
        console.log(this.index.length)
        return this.index.length
    }

    @action 
    setSelectedPhoneNumber(event){
        this.selectedNumber = event.target.value;
    }

    @action
    incrementPage() {
        this.changePage(this.page + 1 > this.TotalPages ? this.TotalPages : this.page + 1)
    }

    @action
    decrementPage() {
        this.changePage(this.page - 1 < 1 ? 1 : this.page - 1)
    }

    @action
    jumpPage(event) {
        let selectedPage = parseInt(event.target.value);
        this.changePage(selectedPage);
    }

    changePage(page) {
        this.page = page
        this.checkAll = false;
        this.index = [];
    }

    @action
    setFilter(value) {
        this.filter = value;
        this.checkAll = false;
        this.page = 1
        this.index = []
    }

    @action
    toggleCallSelection(call) {
        console.log(`Toggling selection for call: ${call.id}`);


        if (this.index.includes(call.id)) {
            this.index.removeObject(call.id);
        } else {
            this.index = [ ...this.index, call.id]
        }

    }

    @action
    toggleSelectAllCalls(event) {
        const isChecked = event.target.checked;
        this.checkAll = isChecked;
        if (isChecked) {
            this.index = [];
            this.index = this.PaginatedFilterLogs.map(call => call.id);
        } else {
            this.index = [];
        }
    }

    @action
    refreshCallLog() {
        window.location.reload();
    }

    @action
    async deleteSelectedCalls() {
        console.log('deleting: ', this.index);


        // this.index contains [Services.VoiceService.1.CallLog.x.]
        // extract all x, and put into param_indexes
        const param_indexes = this.index.map(item => item.split('.')[4]);

        let url = "/commands";
        try {
            let response = await this.api.customFetch(url, {
                method: "post",
                body: JSON.stringify({
                    command: "Device.Services.VoiceService.1.VoipCallLogDel()",
                    commandKey: "",
                    sendresp: true,
                    inputArgs: {
                        Delete_index: param_indexes.join(',')
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Delete Call Log error! status: ${response.status}`);
            }

            this.store.peekAll('services-voiceservice-calllog').forEach(call => {
                if (this.index.includes(call.id)) {
                    call.unloadRecord();
                }
            })

        } catch (error) {
            console.error(`Something went wrong during delete: ${error}`);
        } finally {
            this.index = [];
            this.checkAll = false;
        }

    }
}