import HostsAccessControlSerializer from './hosts-accesscontrol';

export default class WiFiDataElementsNetworkDeviceSerializer extends HostsAccessControlSerializer {
    /* EF200-942 - Radio is missing in relationsips, use hosts-accesscontrol.js store.query() method for better serialization */
}