import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportLCMController extends Controller {
    @service store;
    @service intl;
    
    @tracked selected = 'about';
    @tracked newLicenseTitle = '';
    @tracked licenses = [];

    // This will be set by the route's setupController
    model = [];

    constructor() {
        super(...arguments);
        // Initialize with default licenses, will be updated when model changes
        this.initializeLicenses();
    }

    // This will be called when the model changes
    modelChanged(model) {
        this.model = model || [];
        this.initializeLicenses();
    }

    async initializeLicenses() {
        try {
            //const softwareModules = await this.store.findRecord('softwaremodules', 'SoftwareModules.');
            const deploymentUnits = await this.store.peekAll('softwaremodules-deploymentunit');
            if (deploymentUnits /* && softwareModules.DeploymentUnitNumberOfEntries > 0 */) {
                this.licenses = deploymentUnits.toArray().map(unit => ({
                    id: unit.get('Version'),
                    title: unit.get('Name'),
                    status: unit.get('Status')
                }));
            } else {
                // Fallback to default licenses if no deployment units found
                this.setDefaultLicenses();
            }
        } catch (error) {
            console.error('Error fetching deployment units:', error);
            this.setDefaultLicenses();
        }
    }

    setDefaultLicenses() {
        this.licenses = [
            { id: "about", title: this.intl.t('PAGE_ABOUT_OPEN_SOURCE') },
            { id: "gnu", title: 'GNU Code Requests' },
            { id: "licenses", title: 'Texts of Open Source Licenses' }
        ];
    }

    @action
    accordionChange(index) {
        this.selected = index === this.selected ? null : index;
    }

    @action
    addLicense() {
        if (this.newLicenseTitle.trim()) {
            this.licenses = [...this.licenses, { 
                id: `custom-${Date.now()}`,
                title: this.newLicenseTitle.trim() 
            }];
            this.newLicenseTitle = '';
        }
    }

    @action
    removeLicense(licenseId) {
        this.licenses = this.licenses.filter(license => license.id !== licenseId);
    }

    @action
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addLicense();
        }
    }
}
