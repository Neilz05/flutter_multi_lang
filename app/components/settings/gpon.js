import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';

export default class GponComponent extends Component {
    get hasChanges() {
        let isDirty = false;

        this.args.wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === 'GPON_DHCP' || wan.Alias === 'GPON_PPP6') {
                wan.Intf.forEach(
                    (iface) => {
                        if (iface.hasDirtyAttributes) {
                            isDirty = true;
                        }
                    }
                )
            }
        });

        return isDirty;
    }

    @action
    updateGpon(){
        this.args.wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === 'GPON_DHCP' || wan.Alias === 'GPON_PPP6') {
                wan.Intf.forEach(
                    (iface) => {
                        if (iface.hasDirtyAttributes) {
                            iface.save();
                        }
                    }
                )
            }
        });
    }
}
