export default function validateUniqueAlias() {
    return function (_key, newValue, _oldValue, _changes, content) {
    
        const isDuplicate = content.store.peekAll('hosts-accesscontrol').find((item) => {
            return content.id !== item.id && item.Alias === newValue
        })
        
        return isDuplicate ? 'ERROR_MESSAGE_ALIAS_MUST_BE_UNIQUE' : true;
    };
}
