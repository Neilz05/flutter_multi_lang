export default function validateUniqueSSIDName(existingSSIDs = []) {
    return function (_key, newValue, _oldValue, _changes, content) {

        const currentSSID = content.SSID;
        const otherSSID = existingSSIDs.filter(SSID => SSID !== currentSSID);

        if (otherSSID.includes(newValue)) {
            return 'PAGE_GENERAL_WIFI_NAME_UNIQUE_ERROR';
        }

        return true;
    };
}