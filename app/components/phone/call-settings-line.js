import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { mode } from 'sjcl';

export default class CallSettingsLineComponent extends Component {

    @tracked openConflictModal = false;

    get showCallForwardingOptions() {
        return this.args.model.CallForwardOnBusyEnable === 1 ||
            this.args.model.CallForwardOnNoAnswerEnable === 1 ||
            this.args.model.CallForwardUnconditionalEnable === 1;
    }

    get CallForwardNumber() {
        if (this.args.model.CallForwardUnconditionalEnable === 1) {
            return this.args.model.CallForwardUnconditionalNumber;
        }
        else if (this.args.model.CallForwardOnBusyEnable === 1) {
            return this.args.model.CallForwardOnBusyNumber;
        }
        else if (this.args.model.CallForwardOnNoAnswerEnable === 1) {
            return this.args.model.CallForwardOnNoAnswerNumber;
        }
    }

    get CallForwardTimeout() {
        if (this.args.model.CallForwardOnBusyEnable === 1) {
            return this.args.model.CallForwardOnBusyRingTimeout;
        }
        else if (this.args.model.CallForwardOnNoAnswerEnable === 1) {
            return this.args.model.CallForwardOnNoAnswerRingTimeout;
        }
    }

    @action
    toggle(model, param) {
        model[param] = model[param] === 1 ? 0 : 1;
    }

    @action
    toggleCallWaiting() {
        const model = this.args.model;
        model.CallWaitingEnable = model.CallWaitingEnable === 1 ? 0 : 1;
    }

    @action
    updateCallForwardCondition(event) {
        const model = this.args.model;


        // edge case to check
        // if call waiting is enabled and user wants to set to on-busy,
        // pop up a modal first..
        if (model.CallWaitingEnable === 1 && event.target.value === 'on-busy') {
            console.log("both enabled, need to pop up modal");

            this.openConflictModal = true;
            return;
        }

        //reset all conditions
        model.CallForwardOnBusyEnable = 0;
        model.CallForwardOnNoAnswerEnable = 0;
        model.CallForwardUnconditionalEnable = 0;

        model.CallForwardOnBusyNumber = ''
        model.CallForwardOnNoAnswerNumber = ''
        model.CallForwardUnconditionalNumber = ''

        model.CallForwardOnBusyRingTimeout = 0
        model.CallForwardOnNoAnswerRingTimeout = 0


        if (event.target.value === 'on-busy') {
            model.CallForwardOnBusyEnable = 1;
        }
        else if (event.target.value === 'on-no-answer') {
            model.CallForwardOnNoAnswerEnable = 1;
        }
        else if (event.target.value === 'unconditional') {
            model.CallForwardUnconditionalEnable = 1;
        }
    }



    @action
    toggleCallForwarding(event) {
        console.log(event.target.checked);

        if (event.target.checked) {
            this.args.model.CallForwardUnconditionalEnable = 1;
        }
        else {
            this.args.model.CallForwardOnBusyEnable = 0;
            this.args.model.CallForwardOnNoAnswerEnable = 0;
            this.args.model.CallForwardUnconditionalEnable = 0;
        }

    }

    @action
    UpdateCallForwardNumber(event) {
        if (this.args.model.CallForwardUnconditionalEnable === 1) {
            this.args.model.CallForwardUnconditionalNumber = event.target.value;
        }
        else if (this.args.model.CallForwardOnBusyEnable === 1) {
            this.args.model.CallForwardOnBusyNumber = event.target.value;
        }
        else if (this.args.model.CallForwardOnNoAnswerEnable === 1) {
            this.args.model.CallForwardOnNoAnswerNumber = event.target.value;
        }
    }

    @action
    updateCallTimeout(event) {
        if (this.args.model.CallForwardOnBusyEnable === 1) {
            this.args.model.CallForwardOnBusyRingTimeout = event.target.value;
        }
        else if (this.args.model.CallForwardOnNoAnswerEnable === 1) {
            this.args.model.CallForwardOnNoAnswerRingTimeout = event.target.value;
        }
    }

    @action
    conflictApply() {
        this.openConflictModal = false;
        if (this.args.model.CallWaitingEnable === 1) {
            this.args.model.CallWaitingEnable = 0;
            this.args.model.CallForwardOnBusyEnable = 1;
        }


    }

    @action
    close() {
        this.openConflictModal = false;
        if (this.args.model.CallWaitingEnable === 1) {
            this.args.model.CallForwardOnBusyEnable = 0;
            this.args.model.CallForwardOnNoAnswerEnable = 0;
            this.args.model.CallForwardUnconditionalEnable = 0;
        }
    }

}