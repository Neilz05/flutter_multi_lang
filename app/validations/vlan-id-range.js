export default function validateVLANIDRange() {
    return function (_key, value) {
        const inputValue = Number(value);

        if (inputValue < 0 || inputValue > 4094) {
            return 'VLANID must be between 0 and 4094.';
        }

        return true;
    };
}