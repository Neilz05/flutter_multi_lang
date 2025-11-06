import { validateNumber, validatePresence } from 'ember-changeset-validations/validators';
import validateUniqueVLANID from './vlan-id';
import validateVLANIDRange from './vlan-id-range';

export default function VLANValidation(store, currentModel = null) {

  const allVlanTerminations = store.peekAll('ethernet-vlantermination');

  const currentVlanId = currentModel?.VLANID;
  const existingVlanIds = allVlanTerminations.filter(vlan => vlan.VLANID !== currentVlanId)
    .map(vlan => vlan.VLANID);

  
  return {
    VLANID: [
      validateVLANIDRange(),
      validateUniqueVLANID(existingVlanIds)
    ],
  };
};
