import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class HostsAccessControlSerializer extends JSONAPISerializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        if (!payload || (Array.isArray(payload) && payload.length === 0)) {
            // Return an empty JSON:API structure
            return { data: [] }
        }

        if (requestType === "query") {

            let result = []
            let typeSet = new Set()

            payload.forEach(mod => {
                const modelName = this.typeFromPath(mod.path)

                try {
                    store.modelFor(modelName)
                }
                catch (e) {
                    /* console.log(`Model ${modelName} not found, skipping...`) */
                    return
                }

                /* console.log('Found model', modelName) */
                result.push({
                    id: mod.path.replace(/^Device\./, ''),
                    type: modelName,
                    attributes: mod.parameters,
                    relationships: {}
                })
            })

            typeSet = new Set(result.map(item => item.type));
            console.log('typeSet', typeSet)
            console.log('result before relationships', result)

            result.forEach(item => {

                let typeSplit = item.type.split('-');
                typeSplit.pop();
                let parentType = typeSplit.join('-');

                if (typeSet.has(parentType)) {

                    const parent = result.find(foo => {
                        return foo.type === parentType && item.id.startsWith(foo.id);
                    })

                    if (parent) {
                        /* console.log('Found parent', parent.id, 'for', item.id); */

                        const remaining = item.id.slice(parent.id.length);
                        let multiInstance = false;

                        if (remaining.split('.').length === 3) {
                            multiInstance = true;
                        }

                        const firstDotIndex = remaining.indexOf('.');
                        const relationName = firstDotIndex !== -1 ? remaining.slice(0, firstDotIndex) : remaining;

                        if (multiInstance === false) {
                            parent.relationships[relationName] = {
                                data: {
                                    id: item.id, type: item.type
                                }
                            }
                        }
                        else {
                            if (!parent.relationships[relationName]) {
                                parent.relationships[relationName] = { data: [] };
                            }

                            parent.relationships[relationName].data.push({ id: item.id, type: item.type });
                        }
                    }
                }
            })


            console.log(result)

            //get result, but the element onwards.

            result.slice(1).forEach(item => {
                store.push({ data: item });
            })

            return { data: [result[0]] };
        }

        if (requestType === "createRecord") {
            let module = payload;
            return {
                data: {
                    id: module.path.replace(/^Device\./, ''),
                    type: primaryModelClass.modelName,
                    attributes: {}
                }
            };
        }
    }

    typeFromPath(path) {
        // eg. path is Device.Logical.Interface.1.X_PRPL-COM_LAN.
        // remove trailing device first.
        path = path.replace('Device.', '')

        // remove all instance numbers. Eg. .1.
        path = path.replace(/\.\d+\./g, '.');

        // remove trailing dot.
        if (path.endsWith('.')) {
            path = path.slice(0, -1);
        }

        // remove all dashes and underscores
        path = path.replace(/[-_]/g, '');

        // finally convert to lowercase.
        path = path.toLowerCase();

        // replace all . with -
        path = path.replace(/\./g, '-');

        //console.log('typeFromPath', path);
        return path
    }

    // prevent ember data from changing attributes
    keyForAttribute(key) {
        return key;
    }

    // prevent ember data from changing relationship names
    keyForRelationship(key) {
        return key;
    }
}