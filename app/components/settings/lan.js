import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';

export default class NetworkLanComponent extends Component {
    get dnsRelayEnabled() {
        return this.args.dns.get('Relay.Enable') == 1 ? true : false;
    }
    get dhcpv4ServerEnabled() {
        return this.args.dhcpv4.get('Server.Enable') == 1 ? true : false;
    }
    set dnsRelayEnabled(value) {
        set(this.args.dns, 'Relay.Enable', value ? 1 : 0);
    }
    set dhcpv4ServerEnabled(value) {
        set(this.args.dhcpv4, 'Server.Enable', value ? 1 : 0);
    }

    get hasChanges() {
        let isDirty = false;

        this.args.ip.Interface.forEach((iface) => {
            if (iface.Alias == "lan") {
                iface.IPv4Address.forEach((ipv4addr, ind) => {
                    if (ind == 0) {
                        if (ipv4addr.hasDirtyAttributes) {
                            isDirty = true;
                        }
                    }
                });
            }
        });
        if (this.args.dns.Relay.get('hasDirtyAttributes')) {
            isDirty = true;
        }

        if (this.args.dhcpv4.Server.get('hasDirtyAttributes')) {
            isDirty = true;
        }
        this.args.dhcpv4.Server.get('Pool').forEach((pool) => {
            if (pool.Alias == "lan") {
                if (pool.get('hasDirtyAttributes')) {
                    isDirty = true;
                }

                pool.StaticAddress.forEach((staticAddr) => {
                    if (staticAddr.get('hasDirtyAttributes')) {
                        isDirty = true;
                    }
                });
            }
        });

        return isDirty;
    }

    @action
    updateNetworkLan() {
        this.args.ip.Interface.forEach((iface) => {
            if (iface.Alias == "lan") {
                iface.IPv4Address.forEach((ipv4addr, ind) => {
                    if (ind == 0) {
                        if (ipv4addr.hasDirtyAttributes) {
                            ipv4addr.save();
                        }
                    }
                });
            }
        });
        if (this.args.dns.Relay.get('hasDirtyAttributes')) {
            this.args.dns.save();
        }

        if (this.args.dhcpv4.Server.get('hasDirtyAttributes')) {
            this.args.dhcpv4.save();
        }
        this.args.dhcpv4.Server.get('Pool').forEach((pool) => {
            if (pool.Alias == "lan") {
                if (pool.get('hasDirtyAttributes')) {
                    pool.save();
                }

                pool.StaticAddress.forEach((staticAddr) => {
                    if (staticAddr.get('hasDirtyAttributes')) {
                        staticAddr.save();
                    }
                });
            }
        });
    }
}
