import JSONAPISerializer from '@ember-data/serializer/json-api';
import { camelize, decamelize, capitalize } from '@ember/string';
import sanitize from 'prpl-webui/utils/sanitize';
import { decryptData } from 'prpl-webui/utils/encryption';
import config from 'prpl-webui/config/environment';

export default class DeviceInfoSerializer extends JSONAPISerializer {
  ignoreIds = [
    'DeviceInfo.VendorConfigFile.1.',
  ];

  isIdIgnored(id) {
    this.ignoreIds.forEach(i => {
      if (i === id) return true;
    });
    return false;
  }

  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload = this.processResponse(store, payload);
    payload.data = payload.data[0];

    // console.log('payload! ', JSON.stringify(payload))

    // console.log('super! ',
    //   JSON.stringify(super.normalizeFindRecordResponse(
    //     store,
    //     primaryModelClass,
    //     payload,
    //     id,
    //     requestType
    //   ))
    // )
    return super.normalizeFindRecordResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    payload = this.processResponse(store, payload);

    return super.normalizeFindAllResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeQueryResponse(store,primaryModelClass, payload, id, requestType){
    payload = this.processResponse(store, payload);

    return super.normalizeQueryResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType){
    payload = this.processResponse(store, payload);
    payload.data = payload.data[0];

    return super.normalizeQueryRecordResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  processResponse(store, payload) {
    let result = { data: [], included: [] };
    let namespace = { path: null };
    var prev = { item: null };
    let parents = [];

    // iterate through the payload items
    payload.forEach((record) => {
      this.processRecord(store, record, namespace, parents, prev, result);
    });

    /* TEMP fix for Mesh Topology (copy included field to data field) - Rener */
    if (result.data.length === 0) {
      const temp = result.included;
      result.included = result.data;
      result.data = temp;
      result.included = [];
    }

    return result;
  }

  processRecord(store, record, namespace, parents, prev, result) {
    // remove "Device." prefix if present
    let testDevice = record.path.match(/(?<=^Device\.).+/);
    if (testDevice) {
      record.path = testDevice[0];
    }
    
    // remove "X_PRPL-COM_" prefix if present
    /* let testXPrpl = record.path.match(/(?<=X_PRPL-COM_).+/);
    if (testXPrpl) {
      record.path = testXPrpl[0];
    } */
    // record.path = record.path.replace(/X_SC_/g, '');

    let path = record.path.match(/\b(?![0-9])\w+/g);
    var isArr = record.path.match(/\.[0-9]+\.$/) ? true : false;
    var type = '';
    
    if (!namespace.path) namespace.path = path;

    // check if the last item is a number -> array
    let regs = 0;
    type = path[path.length - 1];
    
    let model = null;
    try {
      model = (store.modelFor(this.recordType(path))) 
    } catch (err) { 
      //console.log(err)
      //console.log(path) 
    } 

    if (model) {

    let item = this.normalizeRecord(store, record, record.path, this.recordType(path));

    // check if the current item is at the same level than the previously processed item
    if (namespace.path.length < path.length) {
      parents.push(prev.item);
      namespace.path = path;
    } else if (namespace.path.length > path.length) {
      for (
        var i = namespace.path.length - 1;
        i >= namespace.path.length - path.length;
        i--
      ) {
        if (parents.length >= path.length) {
          parents.pop();
        }
      }
      namespace.path = path;
    }

    // check if the model is of the root model
    if (record.path === path[0] + '.') {
      result.data.push(item);
    } else {
      // push the record into included and add the relationship
      result.included.push(item);
      this.addRelationship(item, type, parents, path, isArr);
    }

    prev.item = item;
    }
  }

  // NOTE: "type" is misleading since it's actually the property name...
  addRelationship(item, type, parents, path, isArr) {
    let parentObj = parents[parents.length - 1];

    if (parentObj) {
      // does the parent entry already have a relationship property
      if (!parentObj.hasOwnProperty('relationships')) {
        parentObj.relationships = {};
      }

      if (!parentObj.relationships.hasOwnProperty(type))
        parentObj.relationships[type] = isArr ? { data: [] } : { data: null };

      // add the relationship data
      let relItem = { id: item.id, type: this.recordType(path) };
      if (isArr) {
        parentObj.relationships[type].data.push(relItem);
      } else {
        parentObj.relationships[type].data = relItem;
      }
    }
  }

  /**
   * returns the proper payload for a JSON API record
   */
  normalizeRecord(store, record, id, type){
    let attributes = record.parameters;

    // add the TR-181 path for updating the data later
    attributes.path = record.path;

    // add additional relationships if present in model
    let model = null;
    let relationships = {};

    try {
      model = store.modelFor(type);
    } catch {}

    /* sanitize the attributes if the model has sanitizedFields,
    only sanitize those fields otherwise sanitize all string attributes.
    Skip fields that are not strings or are in the skipFields array*/
    let sanitizedFields = model.sanitizedFields || [];
    const skipFields = ['path'];
    Object.keys(attributes).forEach((key) => {
      let value = attributes[key];
      if (
        typeof value === 'string' &&
        !skipFields.includes(key) &&
        (sanitizedFields.length === 0 || sanitizedFields.includes(key))
      ) {
         const sanitizedValue = sanitize(value);
        if (!this.isIdIgnored(id) && sanitizedValue !== value) {
          attributes[key] = value;
        }
      }
    });
    //

    if(model) {
      model.eachRelationship((key, descriptor) => {
        if (attributes.hasOwnProperty(key)) {      
          let isArr = descriptor.kind === 'hasMany' ? true : false;
          if (!relationships.hasOwnProperty(key))
            relationships[key] = isArr ? { data: [] } : { data: null };
          
          if (attributes[key]) { // check if attribute value is available
            let refId = attributes[key].match(/(?<=Device\.).+/)[0]; // remove trailing "Device."
            let relItem = { id: refId, type: descriptor.type };
            
            if (isArr) {
              relationships[key].data.push(relItem);
            } else {
              relationships[key].data = relItem;
            }
          
            // remove attribute
            delete attributes[key];
          }
        } 
      });
    }

    let item = {
      type: type,
      id: id,
      attributes: attributes,
    };

    if (Object.keys(relationships).length) {
      item['relationships'] = relationships;
    }
    
    // console.log('item: ', JSON.stringify(item));
    return item;
  }

  /**
   * generates the record type from the path items
   */
  recordType(path) {
    let type = '';
    path.forEach((part) => {
      //part = part.toLowerCase();
      if (!part.match(/^[0-9]+$/)) {
        type += type ? '-' + part.toLowerCase() : part.toLowerCase();
      }
    });
    return type.replace(/\_/g, '-');
  }

  /**
   * modifies the default serializer function to
   * skip readonly attributes when saving data
   */
  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options && attribute.options.readOnly) return;
    super.serializeAttribute(...arguments);
  }

  /**
   * TODO: properly handle readonly parameters
   */
  serialize(snapshot, options) {
    let attributes = snapshot.changedAttributes();
    let parameters = {};
    Object.keys(attributes).forEach((key) => {
      parameters[key] = attributes[key][1];
    });

    return { parameters: parameters };
  }

  // prevent ember data from changing attributes
  keyForAttribute(key) {
    return key;
  }

  // prevent ember data from changing relationship names
  keyForRelationship(key) {
    return key;
  }

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === 'createRecord') {
        return {
            data: {
                id: payload.path.replace(/^Device\./, ''),
                type: primaryModelClass.modelName,
                attributes: {}
            }
        }
    }
    
    if (!config.APP.encryptionEnabled){
      return super.normalizeResponse(store, primaryModelClass, payload, id, requestType);
    }

    let decrypted = payload.map(item => {
      if (item.parameters) {
        try {
          return {
            path: item.path,
             parameters: decryptData(item.parameters),
          };
        } catch (e) {
          console.error('Decryption failed for item:', item, e);
          return null;
        }
      } else {
        return null;
      }
    }).filter(Boolean); // Remove nulls (failed decrypts or non-encrypted items)
      // console.log('normalizeResponse after decryption', decrypted);
    return super.normalizeResponse(store, primaryModelClass, decrypted, id, requestType);
  }

}
