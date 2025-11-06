import { validatePresence } from 'ember-changeset-validations/validators';

export default {
    RegistrarServer: validatePresence({ presence: true, message: 'Registrar Server is required.' }),
    RegistrarServerPort: validatePresence({ presence: true, message: 'Registrar Server Port is required.' }),
    ProxyServer: validatePresence({ presence: true, message: 'Proxy Server is required.' }),
    ProxyServerPort: validatePresence({ presence: true, message: 'Proxy Server Port is required.' }),
};
