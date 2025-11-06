import ApplicationSerializer from './application';
export default class XPRPLCOMWANManagerSerializer extends ApplicationSerializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        let mainObj = { data: {}, included: [] };
        let recordArr = [];
        let paramsObj;

        // Track already included records (WAN + Intf)
        let seen = new Set();

        // Separate WAN Manager params from WAN entries
        payload.forEach((p) => {
            if (p['path'] === 'WANManager.') {
                paramsObj = p['parameters'];
            } else {
                if (p['path'].split('.').length - 1 < 5) {
                    recordArr.push(p); // WAN objects
                }
            }
        });

        // Top-level WAN Manager record
        mainObj.data.id = id;
        mainObj.data.type = primaryModelClass.modelName;
        mainObj.data.attributes = paramsObj;
        mainObj.data.relationships = {
            WAN: { data: [] }
        };

        // Build WAN records
        const arr = recordArr.map((wanObj) => {
            const wanId = wanObj.path.replace('Device.', '');
            const wanKey = `x-prpl-com-wanmanager-wan:${wanId}`;

            let wanRecord = {
                id: wanId,
                type: 'x-prpl-com-wanmanager-wan',
                attributes: { ...wanObj.parameters },
                relationships: {
                    Intf: { data: [] }
                }
            };

            // Find Intf children for this WAN
            const intfRecords = payload.filter(p =>
                p.path.startsWith(wanObj.path + 'Intf')
            );

            wanRecord.relationships.Intf.data = intfRecords.map(intf => {
                const intfId = intf.path.replace('Device.', '');
                const intfKey = `x-prpl-com-wanmanager-wan-intf:${intfId}`;

                // Full Intf record
                let intfRecord = {
                    id: intfId,
                    type: 'x-prpl-com-wanmanager-wan-intf',
                    attributes: { ...intf.parameters }
                };

                // Deduplicate Intf
                if (!seen.has(intfKey)) {
                    mainObj.included.push(intfRecord);
                    seen.add(intfKey);
                }

                return { id: intfId, type: 'x-prpl-com-wanmanager-wan-intf' };
            });

            // Deduplicate WAN
            if (!seen.has(wanKey)) {
                mainObj.included.push(wanRecord);
                seen.add(wanKey);
            }

            return { id: wanId, type: 'x-prpl-com-wanmanager-wan' };
        });

        mainObj.data.relationships.WAN.data = arr;
        return mainObj;
    }
}