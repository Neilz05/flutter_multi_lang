export default function validateUniqueVLANID(existingAliases = []) {
    return function (_key, newValue, _oldValue, _changes, content) {

        const currentVLANID = content.VLANID;
        const otherVLANID = existingAliases.filter(VLANID => VLANID !== currentVLANID);

        if (otherVLANID.includes(Number(newValue))) {
            return 'VLANID is already in use.';
        }

        return true;
    };
}