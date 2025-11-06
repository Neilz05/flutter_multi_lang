import Serializer from '@ember-data/serializer';

export default class DeviceModuleSerializer extends Serializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        const result = []
        let typeSet = new Set()

        // the application default is very inconsistent.
        if (requestType === "query") {
            payload.forEach(mod => {
                const modelName = this.typeFromPath(mod.path)

                const id = mod.path.replace(/^Device\./, '')

                result.push({
                    id: id,
                    type: modelName,
                    attributes: mod.parameters
                })
            })
        }

        typeSet = new Set(result.map(item => item.type));

        console.log(`Found types: ${Array.from(typeSet).join(', ')}`)

        return { data: result }
    }


    /*
    Found types: 
    device.services.voiceservice.callcontrol.xprplware-comnumberbloallcking, 
    device.services.voiceservice.callcontrol.xprplware-comnumberblocking.incomingblocking, 
    device.services.voiceservice.callcontrol.xprplware-comnumberblocking.incomingblocking.rules, 
    device.services.voiceservice.callcontrol.xprplware-comnumberblocking.outgoingblocking, 
    device.services.voiceservice.callcontrol.xprplware-comnumberblocking.outgoingblocking.rules
    */
    typeFromPath(path) {
        path = path.replace(/\.$/, '')
        const cleaned = path
            .replace(/\.\d+(\.|$)/g, '.')
            .replace(/\.+$/, '')
            .replace(/^Device\./, '')

        // Split by dot, clean each segment, then join by dot
        const modified_path = cleaned
            .split('.')
            .map(seg => seg.replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase())
            .filter(Boolean)
            .join('.')


        if (modified_path === 'services.voiceservice.callcontrol.xprplware-comnumberblocking') 
            return 'services-voiceservice-callcontrol-x-prplware-com-numberblocking';
        else if (modified_path === 'services.voiceservice.callcontrol.xprplware-comnumberblocking.incomingblocking')
            return 'services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking';
        else if (modified_path === 'services.voiceservice.callcontrol.xprplware-comnumberblocking.incomingblocking.rules')
            return 'services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking-rules';
        else if (modified_path === 'services.voiceservice.callcontrol.xprplware-comnumberblocking.outgoingblocking')
            return 'services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking';
        else if (modified_path === 'services.voiceservice.callcontrol.xprplware-comnumberblocking.outgoingblocking.rules')
            return 'services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking-rules';

        return null
    }
}