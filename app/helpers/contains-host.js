import { helper } from '@ember/component/helper';

export default helper(function contains([hosts, physaddress]) {
    const found = hosts.find(host => host.PhysAddress === physaddress);

    if (found){
        return found.HostName;
    }
    
    return physaddress
});