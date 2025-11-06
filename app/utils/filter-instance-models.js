// Utility to filter models with IDs matching a prefix and numeric suffix pattern

export default function filterMultiInstanceModels(models, prefix) {
    return models.filter((data) => {
        const id = data.id;
        if (!id?.startsWith(prefix)) return false;

        const rest = id.slice(prefix.length);
        if (!rest.endsWith('.')) return false;

        const numberPart = rest.slice(0, -1);
        return /^\d+$/.test(numberPart);
    });
}
