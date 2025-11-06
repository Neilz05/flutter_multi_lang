import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class EthernetModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings

    @attr Enable
    @attr VLANID
    @attr Alias
    @attr LowerLayers
    @attr Name
    @attr Status
    @attr TPID
    @attr VLANPriority

    /*
    Alias: "Ethernet_vlan1104"
​​​
Enable: 1
​​​
LastChange: 11951
​​​
LowerLayers: "Device.Ethernet.Link.2."
​​​
Name: "vlan1104"
​​​
Status: "Up"
​​​
TPID: 33024
​​​
VLANID: 1104
​​​
VLANPriority: 0
    */

    @attr({
        defaultValue() { return 'Ethernet.VLANTermination.'; }
    }) _namespace;
}
