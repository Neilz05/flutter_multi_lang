import Serializer from '@ember-data/serializer';
import sanitize from 'prpl-webui/utils/sanitize';

export default class DeviceModuleSerializer extends Serializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {

        if (requestType === "query") {
            let data = payload.map((module, index) => ({
                id: module.path, // Generate a simple ID if backend doesn't provide
                type: primaryModelClass.modelName,
                attributes: {
                    parameters: module.parameters
                }
            }));
            // Sanitize parameters for each module
            data.forEach(element => {
                Object.keys(element.attributes.parameters).forEach((key) => {
                   if (typeof element.attributes.parameters[key] === 'string') {
                        element.attributes.parameters[key] = sanitize(element.attributes.parameters[key]);
                    }
                })
            });

            return { data };
        }

        if (requestType === "queryRecord") {
            let module = payload[0];
            return {
                data: {
                    id: module.path,
                    type: primaryModelClass.modelName,
                    attributes: {
                        parameters: module.parameters
                    }
                }
            };
        }

        if (requestType === "createRecord") {
          let module = payload;
          return {
            data: {
              id: module.path,
              type: primaryModelClass.modelName,
              attributes: {}
            }
        };
      }

      if (requestType === "updateRecord") {
          return {
              data: {
                  id: id,
                  type: primaryModelClass.modelName,
                  attributes: {}
              }
          }
      }
    }
}
