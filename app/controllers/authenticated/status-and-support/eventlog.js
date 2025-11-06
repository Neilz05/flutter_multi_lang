import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedWifiController extends Controller {
    @service store
    @service eaactrl;
    
    @tracked selected_categories = ["System", "WAN", "LAN", "Voice", "Data", "UMTS", "Firewall", "USB", "Mesh"]
    @tracked display_mode = "All"
    @tracked numberOfEntries = 50
    @tracked loading = false;

    categories = ["System", "WAN", "LAN", "Voice", "Data", "UMTS", "Firewall", "USB", "Mesh"]

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaTargetController(this);
    }

    get logdata(){
        if (this.display_mode == "Error_Only")
            return this.model.filter(item => this.selected_categories.includes(item.category) && item.logtype === "we").slice(0, this.numberOfEntries)
        return this.model.filter(item => this.selected_categories.includes(item.category)).slice(0, this.numberOfEntries)
    }

    @action
    toggleCategory(category){
        this.loading = true
        if (this.selected_categories.includes(category)){
            this.selected_categories = this.selected_categories.filter((c) => c !== category)
        }
        else{
            this.selected_categories = [...this.selected_categories, category]
        }

        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }

    @action
    clickDeleteLog(){
        this.click_count = -1
        this.model.clear()
    }

    @action
    async clickDownloadLog(){
        let logs = this.model

        let header = `Device Information:
    Module Name: XXX
    Build Tag: YYY
    Firmware Version: ZZZ
    Build Time: Thu Nov 30 05:22:52 CST 2023
    PON Serial Number: 00000000001\n\n`;

        let body = logs.map(entry => 
            `${entry.timestamp} ${entry.logdata}`
        ).join("\n")

        //let full_file = header + body
        let full_file = body

        let formattedBlob = new Blob([full_file], { type: "text/plain" });
        let url = window.URL.createObjectURL(formattedBlob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `eventlog.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    @action
    toggleDisplayMode(mode){
        this.display_mode = mode
    }


    @action
    async clickDisplayMore(){
        //this.toggleDisplayMode("All")
        //this.selected_categories = ["wifi", "firewall", "dhcp", "lcm", "messages", "messages_remote"]
        this.numberOfEntries += 50
    }

}