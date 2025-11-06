import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RoutingController extends Controller {
    @service store;
    get ipv4routes() {
        return this.store.peekAll('routing-router-ipv4forwarding')
            .filter(route => route.ForwardingMetric >= 0)
            .map(route => {
                // Use display fallback, but don't mutate the model
                let gateway = route.GatewayIPAddress?.trim() || '*'

                // Find matching interface alias (if any)
                let iface = this.store.peekAll('ip-interface').find(
                    iface => `Device.${iface.id}` === route.Interface
                )
                let ifaceAlias = iface ? iface.Alias : route.Interface

                // Return a derived plain object for safe template use
                return {
                    id: route.id,
                    ForwardingMetric: route.ForwardingMetric,
                    GatewayIPAddress: gateway,
                    Interface: ifaceAlias,
                    DestIPAddress: route.DestIPAddress,
                    DestSubnetMask: route.DestSubnetMask,
                    // include any other fields your template needs
                }
            })
    }


    get ipv6routes() {
        // Derive a clean list for display only
        return this.store.peekAll('routing-router-ipv6forwarding')
            .filter(route => route.ForwardingMetric >= 0)
            .map(route => {
                // fallback values (do not mutate the model)
                let dest = route.DestIPPrefix?.trim() || '::'
                let next = route.NextHop?.trim() || '::'

                // find matching interface alias
                let iface = this.store.peekAll('ip-interface').find(
                    iface => `Device.${iface.id}` === route.Interface
                )
                let ifaceAlias = iface ? iface.Alias : route.Interface

                // return a derived plain object for the template
                return {
                    id: route.id,
                    DestIPPrefix: dest,
                    NextHop: next,
                    Interface: ifaceAlias,
                    ForwardingMetric: route.ForwardingMetric,
                    GatewayIPAddress: route.GatewayIPAddress,
                    // ...add other properties you need to display
                }
            })
    }

}