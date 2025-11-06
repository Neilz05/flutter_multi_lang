export default function validateUniqueAlias() {
    return function (_key, newValue, _oldValue, _changes, content) {
    
        const isDuplicate = content.store.peekAll('hosts-accesscontrol').find((item) => {
            return content.id !== item.id && item.PhysAddress === newValue
        })

        return isDuplicate ? 'ERROR_MESSAGE_PHYS_ADDRESS_MUST_BE_UNIQUE' : true;
    };
}