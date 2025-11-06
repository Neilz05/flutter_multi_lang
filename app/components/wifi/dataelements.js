import Component from '@glimmer/component';
import { action,set } from '@ember/object';
import cytoscape from 'cytoscape';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';
import { inject as service } from '@ember/service';
export default class WifiDataElementsComponent extends Component {

    //object to store the controller and agents
    @service reloadTask;
    @tracked controller = {};
    @tracked agents = {};
    @tracked cyInstance = null;
    @tracked controllerImageIsHg = false;
    @tracked agentImageIsRp = false;
    radioCounter = 1;
    agentCounter = 1;
    bssCounter = 1;
    staCounter = 1;
    channelCounter = 1
    apmldCounter = 1;
    stamldCounter = 1;
    affiliatedStaCounter = 1;
    intervalId = null;
    isBlurred = false;
    bssSum = 0;
    yesID = false;
    @action
    generateNodes(event){ //get data from model to store in controller and agents objects
    this.bssSum=0;
      this.args.wifi.reload();
      this.controller = {};
      this.agents = {};
      function safeGet(obj, key) {
        try {
          return obj.get(key);
        } catch (e) {
          console.error(`Error getting ${key}:`, e);
          return null;
        }
      }
      
      // Get ID of controller
      this.controller['ID'] = safeGet(safeGet(this.args.wifidataelem, 'Network'), 'ControllerID');
  
      // Initialize Interfaces and Radios objects
      this.controller['Radios'] = {};
      this.controller['APMLDs'] = {};
  
      // Get controller's interfaces and radios
      safeGet(safeGet(this.args.wifidataelem, 'Network'), 'Device').forEach((device) => {
        if (safeGet(device, 'ID') === this.controller['ID']) {
          this.yesID = true;
          this.controller['ManufacturerModel'] = safeGet(device, 'ManufacturerModel');
          this.controller['LinkType'] = safeGet(safeGet(safeGet(device, 'MultiAPDevice'), 'Backhaul'), 'LinkType');
          this.controller['X_Speedtest'] = safeGet(safeGet(safeGet(device, 'MultiAPDevice'), 'Backhaul'), 'X_Speedtest');
          this.controller['X_SC_Hostname'] = safeGet(device, 'X_SC_Hostname');
          this.controller['X_SC_IPV4Address'] = safeGet(device, 'X_SC_IPV4Address');
          this.controller['SerialNumber'] = safeGet(device, 'SerialNumber');
            
          safeGet(device, 'Radio').forEach((radio) => {
            const radioKey = this.radioCounter.toString();
  
            // Initialize the radio object
            this.controller['Radios'][radioKey] = {};
  
            this.controller['Radios'][radioKey]['ID'] = safeGet(radio, 'ID');
  
            // Initialize the BBSs object
            this.controller['Radios'][radioKey]['BSSs'] = {};
            safeGet(radio, 'BSS').forEach((bss) => {
              const bssKey = this.bssCounter.toString();
              // Initialize the BBSs object
              this.controller['Radios'][radioKey]['BSSs'][bssKey] = {};
  
              this.controller['Radios'][radioKey]['BSSs'][bssKey]['BSSID'] = safeGet(bss, 'BSSID');
              this.controller['Radios'][radioKey]['BSSs'][bssKey]['BackhaulUse'] = safeGet(bss, 'BackhaulUse');
              this.bssCounter++;
              let bssNum = safeGet(bss, 'STANumberOfEntries');
              if (Number.isInteger(bssNum)) {
                this.bssSum += bssNum;
            }
              // Initialize the stations object
              this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'] = {};
  
              // Get stations
              safeGet(bss, 'STA').forEach((sta) => {
                const staKey = this.staCounter.toString();
  
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey] = {};
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['X_SC_LinkQuality'] = safeGet(sta, 'X_SC_LinkQuality');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['MACAddress'] = safeGet(sta, 'MACAddress');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['Hostname'] = safeGet(sta, 'Hostname');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['PacketsSent'] = safeGet(sta, 'PacketsSent');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['PacketsReceived'] = safeGet(sta, 'PacketsReceived');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['ErrorsSent'] = safeGet(sta, 'ErrorsSent');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['ErrorsReceived'] = safeGet(sta, 'ErrorsReceived');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['LastDataDownlinkRate'] = safeGet(sta, 'LastDataDownlinkRate');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['LastDataUplinkRate'] = safeGet(sta, 'LastDataUplinkRate');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['SignalStrength'] = safeGet(sta, 'SignalStrength');
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['IPV4Address'] = safeGet(sta, 'IPV4Address');
                let signalStrength = (safeGet(sta, 'SignalStrength') / 2) - 110;
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['SignalStrength'] = signalStrength;
                
                this.controller['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['IPV4Address'] = safeGet(sta, 'IPV4Address');
                this.staCounter++;
              });
              this.staCounter = 1;
              this.bssCounter++;
            });
  
            this.controller['Radios'][radioKey]['Channels'] = {};
            safeGet(radio, 'CurrentOperatingClasses').forEach((channel) => {
              const channelKey = this.channelCounter.toString();
              this.controller['Radios'][radioKey]['Channels'][channelKey] = {};
              this.controller['Radios'][radioKey]['Channels'][channelKey]['Channel'] = safeGet(channel, 'Channel');
              this.controller['Radios'][radioKey]['Channels'][channelKey]['Class'] = safeGet(channel, 'Class');
              this.channelCounter++;
            });
            this.channelCounter = 1;
            this.bssCounter = 1;
            this.radioCounter++;
          });
          this.radioCounter = 1;
  
          safeGet(device, 'APMLD').forEach((apmld) => {
            const apmldKey = this.apmldCounter.toString();
            this.controller['APMLDs'][apmldKey] = {};
            this.controller['APMLDs'][apmldKey]['STAMLDs'] = {};
  
            this.apmldCounter++;
            safeGet(apmld, 'STAMLD').forEach((stamld) => {
              const stamldKey = this.stamldCounter.toString();
              this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey] = {};
              this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['MLDMACAddress'] = safeGet(stamld, 'MLDMACAddress');
              this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['Hostname'] = safeGet(stamld, 'Hostname')
              this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['IPv4Address'] = safeGet(stamld, 'IPv4Address');
              this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'] = {};
              safeGet(stamld, 'AffiliatedSTA').forEach((affiliatedSta) => {
                const affiliatedStaKey = this.affiliatedStaCounter.toString();
                this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'][affiliatedStaKey] = {};
                this.controller['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'][affiliatedStaKey]['MACAddress'] = safeGet(affiliatedSta, 'MACAddress');
              
                this.affiliatedStaCounter++;
              });
              this.affiliatedStaCounter = 1;
              this.stamldCounter++;
            });
            this.stamldCounter = 1;
          });
          this.apmldCounter = 1;
        }
      });
      
      // Get agents' interfaces and radios
      safeGet(safeGet(this.args.wifidataelem, 'Network'), 'Device').forEach((device) => {
        const agentKey = this.agentCounter.toString();
        if (safeGet(device, 'ID') !== this.controller['ID']) {
  
          // Initialize the agent object
          this.agents[agentKey] = {};
          this.agents[agentKey]['ID'] = safeGet(device, 'ID');
          this.agents[agentKey]['ManufacturerModel'] = safeGet(device, 'ManufacturerModel');
          this.agents[agentKey]['SerialNumber'] = safeGet(device, 'SerialNumber');
          this.agents[agentKey]['LinkType'] = safeGet(safeGet(safeGet(device, 'MultiAPDevice'), 'Backhaul'), 'LinkType');
          this.agents[agentKey]['BackhaulDeviceID'] = safeGet(safeGet(safeGet(device, 'MultiAPDevice'), 'Backhaul'), 'BackhaulDeviceID');
          this.agents[agentKey]['X_Speedtest'] = safeGet(safeGet(safeGet(device, 'MultiAPDevice'), 'Backhaul'), 'X_Speedtest');
          this.agents[agentKey]['X_SC_Hostname'] = safeGet(device, 'X_SC_Hostname');
          this.agents[agentKey]['X_SC_IPV4Address'] = safeGet(device, 'X_SC_IPV4Address');
          this.agents[agentKey]['Radios'] = {};
          this.agents[agentKey]['APMLDs'] = {};
  
          safeGet(device, 'Radio').forEach((radio) => {
            const radioKey = this.radioCounter.toString();
  
            // Initialize the radio object
            this.agents[agentKey]['Radios'][radioKey] = {};
  
            this.agents[agentKey]['Radios'][radioKey]['ID'] = safeGet(radio, 'ID');
  
            // Initialize the BBSs object
            this.agents[agentKey]['Radios'][radioKey]['BSSs'] = {};
            safeGet(radio, 'BSS').forEach((bss) => {
              const bssKey = this.bssCounter.toString();
              // Initialize the BBSs object
              this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey] = {};
  
              this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['BSSID'] = safeGet(bss, 'BSSID');
              this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['BackhaulUse'] = safeGet(bss, 'BackhaulUse');
              let bssNum = safeGet(bss, 'STANumberOfEntries');
              if (Number.isInteger(bssNum)) {
                this.bssSum += bssNum;
            }
              this.bssCounter++;
  
              // Initialize the stations object
              this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'] = {};
  
              // Get stations
              safeGet(bss, 'STA').forEach((sta) => {
                const staKey = this.staCounter.toString();
  
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey] = {};
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['X_SC_LinkQuality'] = safeGet(sta, 'X_SC_LinkQuality');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['MACAddress'] = safeGet(sta, 'MACAddress');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['Hostname'] = safeGet(sta, 'Hostname');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['PacketsSent'] = safeGet(sta, 'PacketsSent');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['PacketsReceived'] = safeGet(sta, 'PacketsReceived');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['ErrorsSent'] = safeGet(sta, 'ErrorsSent');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['ErrorsReceived'] = safeGet(sta, 'ErrorsReceived');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['LastDataDownlinkRate'] = safeGet(sta, 'LastDataDownlinkRate');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['LastDataUplinkRate'] = safeGet(sta, 'LastDataUplinkRate');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['SignalStrength'] = safeGet(sta, 'SignalStrength');
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['IPV4Address'] = safeGet(sta, 'IPV4Address');
                let signalStrength = (safeGet(sta, 'SignalStrength') / 2) - 110;
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['SignalStrength'] = signalStrength;
                
                this.agents[agentKey]['Radios'][radioKey]['BSSs'][bssKey]['Stations'][staKey]['IPV4Address'] = safeGet(sta, 'IPV4Address');
                this.staCounter++;
              });
              this.staCounter = 1;
              this.bssCounter++;
            });
  
            this.agents[agentKey]['Radios'][radioKey]['Channels'] = {};
            safeGet(radio, 'CurrentOperatingClasses').forEach((channel) => {
              const channelKey = this.channelCounter.toString();
              this.agents[agentKey]['Radios'][radioKey]['Channels'][channelKey] = {};
              this.agents[agentKey]['Radios'][radioKey]['Channels'][channelKey]['Channel'] = safeGet(channel, 'Channel');
              this.agents[agentKey]['Radios'][radioKey]['Channels'][channelKey]['Class'] = safeGet(channel, 'Class');
              this.channelCounter++;
            });
            this.channelCounter = 1;
            this.bssCounter = 1;
            this.radioCounter++;
          });
          this.radioCounter = 1;
  
          safeGet(device, 'APMLD').forEach((apmld) => {
            const apmldKey = this.apmldCounter.toString();
            this.agents[agentKey]['APMLDs'][apmldKey] = {};
            this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'] = {};
            //mlo client...
            this.apmldCounter++;
            safeGet(apmld, 'STAMLD').forEach((stamld) => {
              const stamldKey = this.stamldCounter.toString();
              this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey] = {};
              this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['MLDMACAddress'] = safeGet(stamld, 'MLDMACAddress');
              this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['Hostname'] = safeGet(stamld, 'Hostname');
              this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['IPv4Address'] = safeGet(stamld, 'IPv4Address');
              this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'] = {};
              
              safeGet(stamld, 'AffiliatedSTA').forEach((affiliatedSta) => {
                const affiliatedStaKey = this.affiliatedStaCounter.toString();
                this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'][affiliatedStaKey] = {};
                this.agents[agentKey]['APMLDs'][apmldKey]['STAMLDs'][stamldKey]['AffiliatedSTA'][affiliatedStaKey]['MACAddress'] = safeGet(affiliatedSta, 'MACAddress');
              
                this.affiliatedStaCounter++;
              });
              this.affiliatedStaCounter = 1;
              this.stamldCounter++;
            });
            this.stamldCounter = 1;
          });
          this.apmldCounter = 1;
        }
        this.agentCounter++;
      });
      this.agentCounter = 1;
 
      if (!localStorage.getItem('bssSum')){
        localStorage.setItem('bssSum', this.bssSum.toString());
        
      }else{
        let bssValue = parseInt(localStorage.getItem('bssSum'));

         if (bssValue != this.bssSum){
            if (bssValue > this.bssSum){
                localStorage.setItem('refreshed', true);
                localStorage.setItem('bssSum', this.bssSum.toString());
  
                window.location.reload();
            }
            else{
                while(localStorage.getItem('bssSum')){
                localStorage.removeItem('bssSum');}
            }
         }

      }

      this.setupCytoscape();

    }

    setupCytoscape() {
        if (!this.cyInstance) {
            this.cyInstance = cytoscape({
                container: document.getElementById('cy'), // Ensure this element exists
                elements: [], // Your elements here
                style: [], // Your style here
                layout: {
                    name: 'grid'
                }
            });
    
            const tooltip = document.getElementById('tooltip'); // Ensure this element exists
    
            this.cyInstance.on('mouseover', 'node, edge', (event) => {
                const target = event.target;
                const tooltipText = target.data('tooltip');
                const { x, y } = event.renderedPosition;
                tooltip.style.display = 'block';
                tooltip.style.left = `${x + 150}px`;
                tooltip.style.top = `${y + 150}px`;
                tooltip.innerHTML = tooltipText;
            });
    
            this.cyInstance.on('mouseout', 'node, edge', () => {
                tooltip.style.display = 'none';
            });
    
            this.cyInstance.on('drag', 'node, edge', () => {
                tooltip.style.display = 'none';
            });
    
            this.cyInstance.on('pan', () => {
                tooltip.style.display = 'none';
            });
        }
        let mappedIDs = [];

        // Function to find the type of Wi-Fi link based on the channels
        const getWiFiType = (channels) => {
            let has5g = false;
            let has2g = false;
            let has6g = false;
            let wiFiType = "";
            for (const channelKey in channels) {
                if (channels.hasOwnProperty(channelKey)) {
                    const channel = channels[channelKey];
                    // if(channel['Channel'] >= 1 && channel['Channel'] <= 14) {
                    //     has2g = true;
                    // }else if(channel['Channel'] >= 36 && channel['Channel'] <= 165) {
                    //     has5g = true;
                    // }
                    if (channel['Class'] >= 81 && channel['Class'] <= 84) {
                        has2g = true;
                    } else if (channel['Class'] >= 115 && channel['Class'] <= 130) {
                        has5g = true;
                    } else if (channel['Class'] >= 131 && channel['Class'] <= 137) {
                        has6g = true;
                    } else {
                        return "N/A";
                    }
                }
            }

            if(has2g){
                wiFiType = "2.4G";
            }else if(has5g){
                wiFiType = "5G";
            }else if(has6g){
                wiFiType = "6G";
            }
            return wiFiType;
        }

        // Function to get the MLO channels for the edge label
        const getMLOChannels = (radios) => {

            let channelStr = "";
            for (const radioKey in radios){
                if (radios.hasOwnProperty(radioKey)) {
                    const radio = radios[radioKey];
                    for (const channelKey in radio['Channels']) {
                        const channel = radio['Channels'][channelKey];
                        if (channel['Class'] >= 81 && channel['Class'] <= 84) {
                            channelStr += `2.4G CH${channel['Channel']}, `;;
                        } else if (channel['Class'] >= 115 && channel['Class'] <= 130) {
                            channelStr += `5G CH${channel['Channel']}, `;
                        } else if (channel['Class'] >= 131 && channel['Class'] <= 137) {
                            channelStr += `6G CH${channel['Channel']}, `;
                        } else if (channel['Class'] === 0) {
                            if (radio['Channels'].hasOwnProperty(channelKey)) {
                                const channel = radio['Channels'][channelKey];
                                if(channel['Channel'] >= 1 && channel['Channel'] <= 14) {
                                    channelStr += `CH ${channel['Channel']}(2.4G), `;
                                }else if(channel['Channel'] >= 36 && channel['Channel'] <= 165) {
                                    channelStr += `CH ${channel['Channel']}(5G), `;
                                }
                            }
                        } else {
                            return "N/A";
                        }
                    }
                }
            }
           
            channelStr = channelStr.slice(0, -2);
            return channelStr;
        }

        const getNonMLOChannels = (channels) => {
            let channelStr = "";
            for (const channelKey in channels) {
                if (channels.hasOwnProperty(channelKey)) {
                    const channel = channels[channelKey];
                    if (channel['Class'] >= 81 && channel['Class'] <= 84) {
                        channelStr += `2.4G CH${channel['Channel']}, `;;
                    } else if (channel['Class'] >= 115 && channel['Class'] <= 130) {
                        channelStr += `5G CH${channel['Channel']}, `;
                    } else if (channel['Class'] >= 131 && channel['Class'] <= 137) {
                        channelStr += `6G CH${channel['Channel']}, `;
                    } else if (channel['Class'] === 0) {
                        if (channel['Channel'] >= 1 && channel['Channel'] <= 14) {
                            channelStr += `CH ${channel['Channel']}(2.4G), `;
                        } else if(channel['Channel'] >= 36 && channel['Channel'] <= 165) {
                            channelStr += `CH ${channel['Channel']}(5G), `;
                        }
                    } else {
                        return "N/A";
                    }
                }
            }
           
            channelStr = channelStr.slice(0, -2);
            return channelStr;
        }
        
        // Function to get the link quality color
        const getLinkQuality = (linkQuality) => {
            if(linkQuality === "Good"){
                return "#00bf63"; //green
            }else if(linkQuality === "Warning"){
                return "#ffbd59"; //yellow
            }else{
                return "#ff5757"; //red
            }
        }

        let elements = []; //to store the nodes and edges

        //add controller node
    // Check if controller data is valid before pushing to elements
    if (this.controller['ID']) {
        // Add controller node to elements
        elements.push({ 
            data: { 
                id: this.controller['ID'],
                label: this.controller['X_SC_Hostname'] ? `${this.controller['X_SC_Hostname']}` : 'Controller Hostname Unavailable',
                image: '/assets/images/controller.png',
                tooltip: `Controller Name: ${this.controller['X_SC_Hostname']}<br>
                Model: ${this.controller['ManufacturerModel']}<br>
                MAC: ${this.controller['ID']}<br>
                SN: ${this.controller['SerialNumber']}<br>
                IP Address: ${this.controller['X_SC_IPV4Address']}`
            } 
        });
    } else {
        // If ID or hostname is missing, show an alert and don't push
        alert('No Controller Connected');
        elements.push({ 
            data: { 
                id: 'No Controller Connected',
                label: this.controller['X_SC_Hostname'] ? `${this.controller['X_SC_Hostname']}` : 'No Controller Connected',
                image: '/assets/images/controller.png',
            } 
        });
    }

    // After the push attempt, check if elements is still empty
    if (elements.length === 0) {
        alert('No elements to display, no controller data available.');
    }

        

         //loop for adding and linking MLO client and MLO agent to controller
         for (const apmldKey in this.controller['APMLDs']) {
            if (this.controller['APMLDs'].hasOwnProperty(apmldKey)) {
                const apmld = this.controller['APMLDs'][apmldKey];
                for (const stamldKey in apmld['STAMLDs']) {
                    if (apmld['STAMLDs'].hasOwnProperty(stamldKey)) {
                        const stamld = apmld['STAMLDs'][stamldKey];
                        //check if MLO agent
                        let isAgent = false;
                        let agentModel = "";
                        let agentHostname = "";
                        let agentMAC = "";
                        let agentSN = "";
                        let agentSpeedtest = 0;
                        let agentIP = "";

                        for (const agentKey in this.agents) {
                            if (this.agents.hasOwnProperty(agentKey)) {
                                const agent = this.agents[agentKey];
                                //if agent, store agent info
                                if (stamld['MLDMACAddress'] === agent['ID']) {
                                    isAgent = true;
                                    agentModel = agent['ManufacturerModel'];
                                    agentHostname = agent['X_SC_Hostname'];
                                    agentMAC = agent['ID'];
                                    agentSN = agent['SerialNumber'];
                                    agentSpeedtest = agent['X_Speedtest'];
                                    agentIP = agent['X_SC_IPV4Address'];
                                }

                               
                            }
                        }

                        const walkedSTA = {};
                        for (const affiliatedStaKey in stamld['AffiliatedSTA']) {
                            if (stamld['AffiliatedSTA'].hasOwnProperty(affiliatedStaKey)) {
                                const affiliatedSta = stamld['AffiliatedSTA'][affiliatedStaKey];
                                for (const radioKey in this.controller['Radios']) {
                                    if (this.controller['Radios'].hasOwnProperty(radioKey)) {
                                    const radio = this.controller['Radios'][radioKey];
                                        for (const bssKey in radio['BSSs']) {
                                            if (radio['BSSs'].hasOwnProperty(bssKey)) {
                                                const bss = radio['BSSs'][bssKey];
                                                for (const staKey in bss['Stations']) {
                                                    if (bss['Stations'].hasOwnProperty(staKey)) {
                                                        const sta = bss['Stations'][staKey];
                                                        if (sta['MACAddress'] === affiliatedSta['MACAddress'] && !mappedIDs.includes(stamld['MLDMACAddress'])){
                                                            mappedIDs.push(stamld['MLDMACAddress']);
                                                            if(!mappedIDs.includes(affiliatedSta['MACAddress']) && affiliatedSta['MACAddress'] != stamld['MLDMACAddress']){
                                                                mappedIDs.push(affiliatedSta['MACAddress']);
                                                            }
                                                            let tempLabel = getMLOChannels(this.controller['Radios']);
                                                            // record the 2g and 5g of agent to modify the node later
                                                            if (!Object.keys(walkedSTA).includes(sta['MACAddress'])) {
                                                                walkedSTA[sta['MACAddress']] = {
                                                                    Hostname: stamld['Hostname'],
                                                                    PacketsSent: sta['PacketsSent'],
                                                                    PacketsReceived: sta['PacketsReceived'],
                                                                    ErrorsSent: sta['ErrorsSent'],
                                                                    ErrorsReceived: sta['ErrorsReceived'],
                                                                    SignalStrength: sta['SignalStrength'],
                                                                    LastDataDownlinkRate: sta['LastDataDownlinkRate'],
                                                                    LastDataUplinkRate: sta['LastDataUplinkRate'],
                                                                    IPv4Address: stamld['IPv4Address'] && stamld['IPv4Address'] !== '' ? stamld['IPv4Address'] : '',
                                                                }
                                                            }
                                                            // [DYJ04-401] check if receiving any packets
                                                            if (!isAgent && bss['BackhaulUse'] != 1 && sta['PacketsReceived'] !== 0) {
                                                                //add MLO Client node
                                                                elements.push({ 
                                                                    data: { 
                                                                        id: `${stamld['MLDMACAddress']}`, 
                                                                        label: `${sta['Hostname']}`, 
                                                                        image: '/assets/images/device.png',
                                                                        tooltip: ` 
                                                                            Hostname: ${stamld['Hostname']}<br>
                                                                            MAC: ${sta['MACAddress']}<br>
                                                                            PacketsTx: ${sta['PacketsSent']}<br>
                                                                            PacketsRx: ${sta['PacketsReceived']}<br>
                                                                            PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                            PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                            Downlink Rate: ${sta['LastDataDownlinkRate']}<br>
                                                                            Uplink Rate: ${sta['LastDataUplinkRate']}<br>
                                                                            RSSI: ${sta['SignalStrength']}<br>
                                                                            ${stamld['IPv4Address'] && stamld['IPv4Address'] !== '' ? `IPAddress: ${stamld['IPv4Address']}<br>` : ''}
                                                                        `
                                                                    },
                                                                });
                                
                                                                let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                                //link node
                                                                elements.push({ 
                                                                    data: { 
                                                                        source: `${this.controller['ID']}`, 
                                                                        target: `${stamld['MLDMACAddress']}`,
                                                                        lineStyle: 'dashed',
                                                                        lineDashPattern: [36, 8, 4, 8, 4, 8], // REDMI-K60-Pro
                                                                        color:  color,
                                                                        label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                        tooltip: `${tempLabel}`
                                                                    },
                                                                });
                                                            } else if(affiliatedSta['MACAddress'] === stamld['MLDMACAddress'] && !isAgent){
                                                                continue;
                                                            } else {
                                                                //add MLO Agent node
                                                                if (!Object.keys(walkedSTA).includes(agentMAC)) {
                                                                    walkedSTA[agentMAC] = {
                                                                        Model: agentModel,
                                                                        PacketsSent: sta['PacketsSent'],
                                                                        PacketsReceived: sta['PacketsReceived'],
                                                                        ErrorsSent: sta['ErrorsSent'],
                                                                        ErrorsReceived: sta['ErrorsReceived'],
                                                                        SignalStrength: sta['SignalStrength'],
                                                                    }
                                                                    if (agentSpeedtest && agentSpeedtest !== 0) {
                                                                        walkedSTA[affiliatedSta['MACAddress']]['X_Speedtest'] = agentSpeedtest;
                                                                    }
                                                                    if (agentIP && agentIP !== '') {
                                                                        walkedSTA[affiliatedSta['MACAddress']]['X_SC_IPV4Address'] = agentIP;
                                                                    }
                                                                }
                                                                elements.push({ 
                                                                    data: { 
                                                                        id: `${stamld['MLDMACAddress']}`, 
                                                                        label: `${agentHostname}`, 
                                                                        image: '/assets/images/agent.png',
                                                                        tooltip: `
                                                                            Model: ${agentModel}<br>
                                                                            MAC: ${agentMAC}<br>
                                                                            SN: ${agentSN}<br>
                                                                            PacketsTx: ${sta['PacketsSent']}<br>
                                                                            PacketsRx: ${sta['PacketsReceived']}<br>
                                                                            PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                            PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                            RSSI:${sta['SignalStrength']} <br>
                                                                            ${agentSpeedtest && agentSpeedtest !== 0 ? `Last Speedtest: ${agentSpeedtest}<br>` : ''}
                                                                            ${agentIP && agentIP !== '' ? `IPAddress: ${agentIP}<br>` : ''}
                                                                        `, 
                                                                    } 
                                                                });
                                                                let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                                //link node
                                                                elements.push({ 
                                                                    data: { 
                                                                        source: `${this.controller['ID']}`, 
                                                                        target: `${stamld['MLDMACAddress']}`,
                                                                        lineStyle: 'dashed',
                                                                        lineDashPattern: [36, 8, 4, 8, 4, 8],
                                                                        color:  color,
                                                                        label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                        tooltip: `${tempLabel}`
                                                                    },
                                                                });
                                                            }
                                                        }else if (!mappedIDs.includes(affiliatedSta['MACAddress']) && affiliatedSta['MACAddress'] != stamld['MLDMACAddress']){
                                                            mappedIDs.push(affiliatedSta['MACAddress']);
                                                        }

                                                        // add agents not covered by previous loop to elements
                                                        for (const agentKey in this.agents) {
                                                            if (this.agents.hasOwnProperty(agentKey)) {
                                                                let alreadyMapped = false;

                                                                // check if the agent is already in elements
                                                                for (const element of elements) {
                                                                    if (element.data.id === this.agents[agentKey]['ID']) {
                                                                        // mappedIDs.push(this.agents[agentKey]['ID']);
                                                                        alreadyMapped = true;
                                                                        break;
                                                                    }
                                                                }

                                                                if (!Object.keys(walkedSTA).includes(this.agents[agentKey]['ID'])) {
                                                                    walkedSTA[this.agents[agentKey]['ID']] = {
                                                                        Model: this.agents[agentKey]['ManufacturerModel'],
                                                                        PacketsSent: sta['PacketsSent'],
                                                                        PacketsReceived: sta['PacketsReceived'],
                                                                        ErrorsSent: sta['ErrorsSent'],
                                                                        ErrorsReceived: sta['ErrorsReceived'],
                                                                        SignalStrength: sta['SignalStrength'],
                                                                        LastDataDownlinklinkRate: sta['LastDataDownlinkRate'],
                                                                        LastDataUplinkRate: sta['LastDataUplinkRate'],
                                                                        IPv4Address: stamld['IPv4Address'] && stamld['IPv4Address'] !== '' ? stamld['IPv4Address'] : undefined,
                                                                        X_Speedtest: this.agents[agentKey]['X_Speedtest'] && this.agents[agentKey]['X_Speedtest'] !== 0 ? this.agents[agentKey]['X_Speedtest'] : undefined, 
                                                                        X_SC_IPV4Address: this.agents[agentKey]['X_SC_IPV4Address'] && this.agents[agentKey]['X_SC_IPV4Address'] !== '' ? this.agents[agentKey]['X_SC_IPV4Address'] : undefined,
                                                                    }
                                                                }
                                                                // if (mappedIDs.includes(this.agents[agentKey]['ID'])) continue;
                                                                if (alreadyMapped) {
                                                                    continue;
                                                                } else {    // add agent to elements
                                                                    if (sta['PacketsReceived'] !== 0) {
                                                                        elements.push({
                                                                            data: {
                                                                                id: `${this.agents[agentKey]['ID']}`,
                                                                                label: `${this.agents[agentKey]['X_SC_Hostname']}`,
                                                                                image: '/assets/images/agent.png',
                                                                                tooltip: `
                                                                                    Model: ${this.agents[agentKey]['ManufacturerModel']}<br>
                                                                                    MAC: ${this.agents[agentKey]['ID']}<br>
                                                                                    SN: ${this.agents[agentKey]['SerialNumber']}<br>
                                                                                    PacketsTx: ${sta['PacketsSent']}<br>
                                                                                    PacketsRx: ${sta['PacketsReceived']}<br>
                                                                                    PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                                    PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                                    RSSI: ${sta['SignalStrength']} <br>
                                                                                    ${this.agents[agentKey]['X_Speedtest'] && this.agents[agentKey]['X_Speedtest'] !== 0 ? `Last Speedtest: ${this.agents[agentKey]['X_Speedtest']}<br>` : ''}
                                                                                    ${this.agents[agentKey]['X_SC_IPV4Address'] && this.agents[agentKey]['X_SC_IPV4Address'] !== '' ? `IPAddress: ${this.agents[agentKey]['X_SC_IPV4Address']}<br>` : ''}
                                                                                `,
                                                                            }
                                                                        });

                                                                        let tempLabel = getMLOChannels(this.controller['Radios']);
                                                                        let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                                    
                                                                        //link node
                                                                        elements.push({
                                                                            data: {
                                                                                source: `${this.agents[agentKey]['BackhaulDeviceID']}`,
                                                                                target: `${this.agents[agentKey]['ID']}`,
                                                                                lineStyle: 'dashed',
                                                                                lineDashPattern: [36, 8, 4, 8, 4, 8], // RP7562B_0006
                                                                                color: color,
                                                                                label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                                tooltip: `${tempLabel}`
                                                                            },
                                                                        });
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        // modify the node(s) based on both of their radios
                        const totalPacketsSent      = Object.keys(walkedSTA).map(i => walkedSTA[i].PacketsSent)     .reduce((acc, curr) => acc + curr, 0);
                        const totalPacketsReceived  = Object.keys(walkedSTA).map(i => walkedSTA[i].PacketsReceived) .reduce((acc, curr) => acc + curr, 0);
                        const totalErrorsSent       = Object.keys(walkedSTA).map(i => walkedSTA[i].ErrorsSent)      .reduce((acc, curr) => acc + curr, 0);
                        const totalErrorsReceived   = Object.keys(walkedSTA).map(i => walkedSTA[i].ErrorsReceived)  .reduce((acc, curr) => acc + curr, 0);
                        const biggerRSSI = Math.max(...Object.keys(walkedSTA).map(i => walkedSTA[i].SignalStrength) .filter(rssi => rssi !== 0));
                        for (const e in elements) {
                            let outbreak = false;
                            for (const w in walkedSTA) {
                                if (elements[e].data?.id === w) {
                                    elements[e].data['tooltip'] = `
                                        ${walkedSTA[w].Model !== undefined ? `Model: ${walkedSTA[w].Model}<br>` : ``}
                                        ${walkedSTA[w].Hostname !== undefined ? `Hostname: ${walkedSTA[w].Hostname}<br>` : ``}
                                        MAC: ${w}<br>
                                        PacketsTx: ${totalPacketsSent}<br>
                                        PacketsRx: ${totalPacketsReceived}<br>
                                        PacketsTxError: ${totalErrorsSent}<br>
                                        PacketsRxError: ${totalErrorsReceived}<br>
                                        ${w.LastDataDownlinkRate !== undefined ? `Downlink Rate: ${walkedSTA[w].LastDataDownlinkRate}<br>`:``}
                                        ${w.LastDataUplinkRate !== undefined ? `Uplink Rate: ${walkedSTA[w].LastDataUplinkRate}<br>`:``}
                                        RSSI: ${biggerRSSI}<br>
                                        ${walkedSTA[w].X_Speedtest !== undefined ? `Last Speedtest: ${walkedSTA[w].X_Speedtest}` : ``}
                                        ${walkedSTA[w].X_SC_IPV4Address !== undefined ? `IPAddress: ${walkedSTA[w].X_SC_IPV4Address}` : ``}
                                    `;
                                    outbreak = true;
                                    break;
                                }
                                if (outbreak) break;
                            }
                        }
                    }
                }
            }
        }

        //loop for adding and linking non-MLO agents to controller
        for (const agentKey in this.agents) {
            if (this.agents.hasOwnProperty(agentKey)) {
                const agent = this.agents[agentKey];
                //link non-MLO agent to controller
                if (agent['LinkType'] === 'Wi-Fi') { //wifi link
                    if (agent['BackhaulDeviceID'] === this.controller['ID']) {
                        for (const radioKey in this.controller['Radios']) {
                            if (this.controller['Radios'].hasOwnProperty(radioKey)) {
                                const radio = this.controller['Radios'][radioKey];
                                for (const bssKey in radio['BSSs']) {
                                    if (radio['BSSs'].hasOwnProperty(bssKey)) {
                                        const bss = radio['BSSs'][bssKey];
                                        for (const staKey in bss['Stations']) {
                                            const sta = bss['Stations'][staKey];

                                            /* For VTV issue EF200-584 */
                                            let tempBSSIDs = [];
                                            for (const kk in this.agents) {
                                                const theagent = this.agents[kk];
                                                for (const rK in theagent['Radios']) {
                                                    const rad = theagent['Radios'][rK];
                                                    for (const bK in rad['BSSs']) {
                                                        const bs = rad['BSSs'][bK];
                                                        tempBSSIDs.push(bs['BSSID']);
                                                    }
                                                }
                                            }

                                            /* 
                                             * based on the STA [MACAddress] obtained from controller, find the Device.i. with that same [MACAddress] on its Interface
                                             * then check if that Device.i. has the agent['ID'] as a [MACAddress] on its other Interface(s)
                                             */
                                            let deviceMacs = {};
                                            this.args.wifidataelem.Network.get('Device').forEach((dev) => {
                                                const parts = dev.id.split('.');
                                                const devidx = parts[parts.length-2];
                                                deviceMacs[devidx] = dev.Interface.map(intf => intf.MACAddress);
                                            })

                                            let includesSTAMac = false;
                                            let includesAgentId = false;
                                            for (const key in deviceMacs) {
                                                includesSTAMac = deviceMacs[key].includes(sta['MACAddress'])
                                                includesAgentId = includesSTAMac && deviceMacs[key].includes(agent['ID']);
                                            }
                                            /* ===================== */
                                            if ((sta['MACAddress'] === agent['ID'] || tempBSSIDs.includes(sta['MACAddress']) || (includesSTAMac && includesAgentId)) && !mappedIDs.includes(agent['ID'])){
                                                mappedIDs.push(agent['ID']);
                                                //add non-MLO Agent node
                                                elements.push({ 
                                                    data: { 
                                                        id: `${agent['ID']}`, 
                                                        label: `${agent['X_SC_Hostname']}`,
                                                        image: '/assets/images/agent.png',
                                                        tooltip: `
                                                            Model: ${agent['ManufacturerModel']}<br>
                                                            MAC: ${agent['ID']}<br>
                                                            SN: ${agent['SerialNumber']}<br>
                                                            PacketsTx: ${sta['PacketsSent']}<br>
                                                            PacketsRx: ${sta['PacketsReceived']}<br>
                                                            PacketsTxError: ${sta['ErrorsSent']}<br>
                                                            PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                            RSSI:${sta['SignalStrength']} <br>
                                                             ${agent['X_Speedtest'] && agent['X_Speedtest'] !== 0 ? `Last Speedtest: ${agent['X_Speedtest']}<br>` : ''}
                                                            ${agent['X_SC_IPV4Address'] && agent['X_SC_IPV4Address'] !== '' ? `IPAddress: ${agent['X_SC_IPV4Address']}<br>` : ''}
                                                        `, 
                                                    } 
                                                });
                                                //link non-MLO agent to controller
                                                let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                let wiFiLinkType = getWiFiType(radio['Channels']);
                                                let tempLabel = getNonMLOChannels(radio['Channels']);
                                                if(wiFiLinkType === '2.4G'){
                                                    elements.push({ 
                                                        data: { 
                                                            source: `${this.controller['ID']}`, 
                                                            target: `${agent['ID']}`,
                                                            lineStyle: 'dashed',
                                                            lineDashPattern: [4, 24],
                                                            color:  color,
                                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                            tooltip: `${tempLabel}`
                                                        },
                                                    });
                                                // }else if(wiFiLinkType === '5G'){
                                                }else{
                                                    elements.push({ 
                                                        data: { 
                                                            source: `${this.controller['ID']}`, 
                                                            target: `${agent['ID']}`,
                                                            lineStyle: 'dashed',
                                                            lineDashPattern: [12, 4],
                                                            color:  color,
                                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                            tooltip: `${tempLabel}`
                                                        }, 
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        //link non-MLO agent to another agent
                        for (const tempAgentKey in this.agents) {
                            if (this.agents.hasOwnProperty(tempAgentKey)) {
                                const tempAgent = this.agents[tempAgentKey];
                                if (agent['BackhaulDeviceID'] === tempAgent['ID']) {
                                    for (const radioKey in tempAgent['Radios']) {
                                        if (tempAgent['Radios'].hasOwnProperty(radioKey)) {
                                            const radio = tempAgent['Radios'][radioKey];
                                            for (const bssKey in radio['BSSs']) {
                                                if (radio['BSSs'].hasOwnProperty(bssKey)) {
                                                    const bss = radio['BSSs'][bssKey];
                                                    for (const staKey in bss['Stations']) {
                                                        const sta = bss['Stations'][staKey];
                                                        if (sta['MACAddress'] === agent['ID'] && !mappedIDs.includes(agent['ID'])){
                                                            mappedIDs.push(agent['ID']);
                                                            //add non-MLO Agent node
                                                            elements.push({ 
                                                                data: { 
                                                                    id: `${agent['ID']}`, 
                                                                    label: `${agent['X_SC_Hostname']}`,
                                                                    image: '/assets/images/agent.png',
                                                                    tooltip: `
                                                                        Model: ${agent['ManufacturerModel']}<br>
                                                                        MAC: ${agent['ID']}<br>
                                                                        SN: ${agent['SerialNumber']}<br>
                                                                        PacketsTx: ${sta['PacketsSent']}<br>
                                                                        PacketsRx: ${sta['PacketsReceived']}<br>
                                                                        PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                        PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                        RSSI:${sta['SignalStrength']} <br>
                                                                         ${agent['X_Speedtest'] && agent['X_Speedtest'] !== 0 ? `Last Speedtest: ${agent['X_Speedtest']}<br>` : ''}
                                                                        ${sta['IPV4Address'] && sta['IPV4Address'] !== '' ? `IPAddress: ${sta['IPV4Address']}<br>` : ''}
                                                                    `, 
                                                                } 
                                                            });
                                                            let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                            let wiFiLinkType = getWiFiType(radio['Channels']);
                                                            let tempLabel = getNonMLOChannels(radio['Channels']);
                                                            //link non-MLO agent 
                                                            if(wiFiLinkType === '2.4G'){
                                                                elements.push({ 
                                                                    data: { 
                                                                        source: `${tempAgent['ID']}`, 
                                                                        target: `${agent['ID']}`,
                                                                        lineStyle: 'dashed',
                                                                        lineDashPattern: [4, 24],
                                                                        color:  color,
                                                                        label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                        tooltip: `${tempLabel}`
                                                                    },
                                                                });
                                                            // }else if(wiFiLinkType === '5G'){
                                                            }else{
                                                                elements.push({ 
                                                                    data: { 
                                                                        source: `${tempAgent['ID']}`, 
                                                                        target: `${agent['ID']}`,
                                                                        lineStyle: 'dashed',
                                                                        lineDashPattern: [12, 4],
                                                                        color:  color,
                                                                        label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                        tooltip: `${tempLabel}`
                                                                    }, 
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }    
                        
                    }
                    
                }else if (agent['LinkType'] === 'Ethernet') { //ethernet link
                    elements.push({ 
                        data: { 
                            id: `${agent['ID']}`, 
                            label: `${agent['X_SC_Hostname']}`,
                            image: '/assets/images/agent.png',
                            isEthernet: 1,
                            tooltip: `
                                Model: ${agent['ManufacturerModel']}<br>
                                MAC: ${agent['ID']}<br>
                                SN: ${agent['SerialNumber']}<br>
                                ${agent['X_Speedtest'] && agent['X_Speedtest'] !== 0 ? `Last Speedtest: ${agent['X_Speedtest']}<br>` : ''}
                                ${agent['X_SC_IPV4Address'] && agent['X_SC_IPV4Address'] !== '' ? `IPAddress: ${agent['X_SC_IPV4Address']}<br>` : ''}
                            `, 
                        } 
                    });
                    elements.push({ 
                        data: { 
                            source: `${agent['BackhaulDeviceID']}`, 
                            target: `${agent['ID']}`,
                            lineStyle: 'solid',
                            lineDashPattern: [0, 0],
                            label: '',
                            color:  '#545454',
                            tooltip: 'Eth'
                        } 
                    });
                }
                 
                //loop for adding and linking MLO clients and agents to agents
                for (const apmldKey in agent['APMLDs']) {
                    if (agent['APMLDs'].hasOwnProperty(apmldKey)) {
                        const apmld = agent['APMLDs'][apmldKey];
                        for (const stamldKey in apmld['STAMLDs']) {
                            if (apmld['STAMLDs'].hasOwnProperty(stamldKey)) {
                                const stamld = apmld['STAMLDs'][stamldKey];
                                //check if MLO agent
                                let isAgent = false;
                                let agentModel = "";
                                let agentHostname = "";
                                let agentMAC = "";
                                let agentSN = "";
                                let agentSpeedtest = 0;
                                let agentIP = "";

                                for (const tempAgentKey in this.agents) {
                                    if (this.agents.hasOwnProperty(tempAgentKey)) {
                                        const tempAgent = this.agents[tempAgentKey];
                                        if (stamld['MLDMACAddress'] === tempAgent['ID']) {
                                            isAgent = true;
                                            agentModel = tempAgent['ManufacturerModel'];
                                            agentHostname = tempAgent['X_SC_Hostname'];
                                            agentMAC = tempAgent['ID'];
                                            agentSN = tempAgent['SerialNumber'];
                                            agentSpeedtest = tempAgent['X_Speedtest'];
                                            agentIP = tempAgent['X_SC_IPV4Address'];
                                        }
                                    }
                                }

                                // different logic as the walkedSTA map above
                                let walkedSTA = [];
                                let count = 0;
                                for (const affiliatedStaKey in stamld['AffiliatedSTA']) {
                                    if (stamld['AffiliatedSTA'].hasOwnProperty(affiliatedStaKey)) {
                                        const affiliatedSta = stamld['AffiliatedSTA'][affiliatedStaKey];
                                        for (const radioKey in agent['Radios']) {
                                            if (agent['Radios'].hasOwnProperty(radioKey)) {
                                            const radio = agent['Radios'][radioKey];
                                                for (const bssKey in radio['BSSs']) {
                                                    if (radio['BSSs'].hasOwnProperty(bssKey)) {
                                                        const bss = radio['BSSs'][bssKey];
                                                        for (const staKey in bss['Stations']) {
                                                            const sta = bss['Stations'][staKey];
                                                            if (sta['MACAddress'] === affiliatedSta['MACAddress']) {
                                                                if(!mappedIDs.includes(affiliatedSta['MACAddress']) && affiliatedSta['MACAddress'] != stamld['MLDMACAddress']){
                                                                    mappedIDs.push(affiliatedSta['MACAddress']);
                                                                }else if(affiliatedSta['MACAddress'] === stamld['MLDMACAddress'] && !isAgent){
                                                                    continue;
                                                                }
                                                                if (!Object.keys(walkedSTA).includes(sta['MACAddress'])) {
                                                                    walkedSTA.push({
                                                                        count: count++,
                                                                        id: stamld['MLDMACAddress'],
                                                                        MAC: sta['MACAddress'],
                                                                        PacketsSent: sta['PacketsSent'],
                                                                        PacketsReceived: sta['PacketsReceived'],
                                                                        ErrorsSent: sta['ErrorsSent'],
                                                                        ErrorsReceived: sta['ErrorsReceived'],
                                                                        SignalStrength: sta['SignalStrength'],
                                                                        LastDataDownlinkRate: sta['LastDataDownlinkRate'],
                                                                        LastDataUplinkRate: sta['LastDataUplinkRate'],
                                                                        SignalStrength: sta['SignalStrength'],
                                                                        IPAddress: sta['IPV4Address'] && sta['IPV4Address'] !== '' ? sta['IPV4Address'] : '',
                                                                    })
                                                                    // handle the 'else if (isAgent) case below
                                                                    if (isAgent && agentModel !== '') {
                                                                        for (w in walkedSTA) {
                                                                            if (w.count === count) {
                                                                                w.Model = agentModel;
                                                                                w.MAC = agentMAC;
                                                                                w.SN = agentSN;
                                                                                w['X_Speedtest'] = agentSpeedtest && agentSpeedtest !== 0 ? agentSpeedtest : 0;
                                                                                w['X_SC_IPV4Address'] = agentIP && agentIP !== '' ? agentIP : '';
                                                                            }
                                                                        }
                                                                        walkedSTA[sta['MACAddress']]['Model'] = agentModel;
                                                                    }
                                                                }
                                                                let tempLabel = getMLOChannels(agent['Radios']);
                                                                if (!isAgent && bss['BackhaulUse'] != 1 && sta['PacketsReceived'] !== 0) {
                                                                    //add MLO Client node
                                                                    elements.push({ 
                                                                        data: { 
                                                                            id: `${stamld['MLDMACAddress']}`, 
                                                                            label: `${sta['Hostname']}`, 
                                                                            image: '/assets/images/device.png',
                                                                            tooltip: ` 
                                                                                MAC: ${sta['MACAddress']}<br>
                                                                                PacketsTx: ${sta['PacketsSent']}<br>
                                                                                PacketsRx: ${sta['PacketsReceived']}<br>
                                                                                PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                                PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                                Downlink Rate: ${sta['LastDataDownlinkRate']}<br>
                                                                                Uplink Rate: ${sta['LastDataUplinkRate']}<br>
                                                                                RSSI: ${sta['SignalStrength']}<br>
                                                                                ${sta['IPV4Address'] && sta['IPV4Address'] !== '' ? `IPAddress: ${sta['IPV4Address']}<br>` : ''}
                                                                            `
                                                                        },
                                                                    });

                                                                    let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                                    elements.push({ 
                                                                        data: { 
                                                                            source: `${agent['ID']}`, 
                                                                            target: `${stamld['MLDMACAddress']}`,
                                                                            lineStyle: 'dashed',
                                                                            lineDashPattern: [36, 8, 4, 8, 4, 8], // IPHONE
                                                                            color:  color,
                                                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                            tooltip: `${tempLabel}`
                                                                        },
                                                                    });
                                                                } else if(affiliatedSta['MACAddress'] === stamld['MLDMACAddress'] && !isAgent){
                                                                    continue;
                                                                } else if (isAgent) {
                                                                    if(mappedIDs.includes(stamld['MLDMACAddress'])){
                                                                        elements.forEach((element) => {
                                                                            if (element.data.id === stamld['MLDMACAddress']) {
                                                                                element.data.label = `${agentHostname}`;
                                                                                element.data.tooltip = `
                                                                                    Model: ${agentModel}<br>
                                                                                    MAC: ${agentMAC}<br>
                                                                                    SN: ${agentSN}<br>
                                                                                    PacketsTx: ${sta['PacketsSent']}<br>
                                                                                    PacketsRx: ${sta['PacketsReceived']}<br>
                                                                                    PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                                    PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                                    RSSI:${sta['SignalStrength']} <br>
                                                                                     ${agentSpeedtest && agentSpeedtest !== 0 ? `Last Speedtest: ${agentSpeedtest}<br>` : ''}
                                                                                    ${agentIP && agentIP !== '' ? `IPAddress: ${agentIP}<br>` : ''}
                                                                                `;
                                                                            }
                                                                        });
                                                                    }else{
                                                                        //add MLO Agent node
                                                                        if (sta['PacketsReceived'] !== 0) {
                                                                            elements.push({ 
                                                                                data: { 
                                                                                    id: `${stamld['MLDMACAddress']}`, 
                                                                                    label: `${agentHostname}`, 
                                                                                    image: '/assets/images/agent.png',
                                                                                    tooltip: `
                                                                                        Model: ${agentModel}<br>
                                                                                        MAC: ${agentMAC}<br>
                                                                                        SN: ${agentSN}<br>
                                                                                        PacketsTx: ${sta['PacketsSent']}<br>
                                                                                        PacketsRx: ${sta['PacketsReceived']}<br>
                                                                                        PacketsTxError: ${sta['ErrorsSent']}<br>
                                                                                        PacketsRxError: ${sta['ErrorsReceived']}<br>
                                                                                        RSSI:${sta['SignalStrength']} <br>
                                                                                         ${agentSpeedtest && agentSpeedtest !== 0 ? `Last Speedtest: ${agentSpeedtest}<br>` : ''}
                                                                                        ${agentIP && agentIP !== '' ? `IPAddress: ${agentIP}<br>` : ''}
                                                                                    `, 
                                                                                } 
                                                                            });
                                                                        }
                                                                    }
                                                                    let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                                                    elements.push({ 
                                                                        data: { 
                                                                            source: `${agent['ID']}`, 
                                                                            target: `${stamld['MLDMACAddress']}`,
                                                                            lineStyle: 'dashed',
                                                                            lineDashPattern: [36, 8, 4, 8, 4, 8],
                                                                            color:  color,
                                                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                                            tooltip: `${tempLabel}`
                                                                        },
                                                                    });
                                                                   
                                                                }
                                                                if(!mappedIDs.includes(stamld['MLDMACAddress'])){
                                                                    mappedIDs.push(stamld['MLDMACAddress']);
                                                                }
                                                            }else if (!mappedIDs.includes(affiliatedSta['MACAddress']) && affiliatedSta['MACAddress'] != stamld['MLDMACAddress']){
                                                                mappedIDs.push(affiliatedSta['MACAddress']);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                // modify the node(s) based on both of their radios

                                let sortedDevices = walkedSTA.reduce((acc, obj) => {
                                    if (!acc[obj.id]) {
                                        acc[obj.id] = {};
                                    }
                                    acc[obj.id].PacketsSent = (acc[obj.id].PacketsSent ?? 0) + obj.PacketsSent;
                                    acc[obj.id].PacketsReceived = (acc[obj.id].PacketsReceived ?? 0) + obj.PacketsReceived;
                                    acc[obj.id].ErrorsSent = (acc[obj.id].ErrorsSent ?? 0) + obj.ErrorsSent;
                                    acc[obj.id].ErrorsReceived = (acc[obj.id].ErrorsReceived ?? 0) + obj.ErrorsReceived;
                                    acc[obj.id].LastDataDownlinkRate = (acc[obj.id].LastDataDownlinkRate ?? 0) + obj.LastDataDownlinkRate;
                                    acc[obj.id].LastDataUplinkRate = (acc[obj.id].LastDataUplinkRate ?? 0) + obj.LastDataUplinkRate;
                                    const currentRSSIOrZero = acc[obj.id].SignalStrength ?? 0;
                                    acc[obj.id].SignalStrength = (currentRSSIOrZero < obj.SignalStrength) && (currentRSSIOrZero !== 0) ? currentRSSIOrZero : obj.SignalStrength;
                                    if (obj.X_Speedtest) acc[obj.id].X_Speedtest = obj.X_Speedtest;
                                    acc[obj.id].IPAddress = acc[obj.id].IPAddress ? acc[obj.id].IPAddress : obj.IPAddress; 
                                    return acc;
                               }, {});

                                for (const e in elements) {
                                    let outbreak = false;
                                    for (const w of Object.keys(sortedDevices)) {
                                        if (elements[e].data?.id === w) {
                                            elements[e].data['tooltip'] = `
                                                ${sortedDevices[w].Model !== undefined ? `Model: ${walkedSTA[w].Model}<br>` : ``}
                                                ${sortedDevices[w].Hostname !== undefined ? `Hostname: ${walkedSTA[w].Hostname}<br>` : ``}
                                                MAC: ${w}<br>
                                                PacketsTx: ${sortedDevices[w].PacketsSent}<br>
                                                PacketsRx: ${sortedDevices[w].PacketsReceived}<br>
                                                PacketsTxError: ${sortedDevices[w].ErrorsSent}<br>
                                                PacketsRxError: ${sortedDevices[w].ErrorsReceived}<br>
                                                ${sortedDevices[w].LastDataDownlinkRate !== undefined ? `Downlink Rate: ${sortedDevices[w].LastDataDownlinkRate}<br>`:``}
                                                ${sortedDevices[w].LastDataUplinkRate !== undefined ? `Uplink Rate: ${sortedDevices[w].LastDataUplinkRate}<br>`:``}
                                                RSSI: ${sortedDevices[w].SignalStrength}<br>
                                                ${sortedDevices[w].X_Speedtest !== undefined ? `Last Speedtest: ${sortedDevices[w].X_Speedtest}` : ``}
                                                ${sortedDevices[w].IPAddress !== undefined ? `IPAddress: ${sortedDevices[w].IPAddress}` : ``}
                                            `;
                                            outbreak = true;
                                            break;
                                        }
                                        if (outbreak) break;
                                    }
                                }
                            }
                        }
                    }
                }

                //loop for adding and linking non-MLO client to agents
                for (const agentRadioKey in agent['Radios']) {
                    if (agent['Radios'].hasOwnProperty(agentRadioKey)) {
                    const agentRadio = agent['Radios'][agentRadioKey];
                        let agentRadioLinkType = getWiFiType(agentRadio['Channels']);
                        for (const agentBssKey in agentRadio['BSSs']) {
                            if (agentRadio['BSSs'].hasOwnProperty(agentBssKey)) {
                            const agentBss = agentRadio['BSSs'][agentBssKey];
                                for (const agentStaKey in agentBss['Stations']) {
                                    const agentSta = agentBss['Stations'][agentStaKey];
                                    if(!mappedIDs.includes(agentSta['MACAddress']) && agentBss['BackhaulUse'] != 1){
                                        mappedIDs.push(agentSta['MACAddress']);
                                        //add station node
                                        elements.push({ 
                                            data: { 
                                                id: `${agentSta['MACAddress']}`, 
                                                label: `${agentSta['Hostname']}`, 
                                                image: '/assets/images/device.png',
                                                tooltip: `
                                                    MAC: ${agentSta['MACAddress']}<br>
                                                    PacketsTx: ${agentSta['PacketsSent']}<br>
                                                    PacketsRx: ${agentSta['PacketsReceived']}<br>
                                                    PacketsTxError: ${agentSta['ErrorsSent']}<br>
                                                    PacketsRxError: ${agentSta['ErrorsReceived']}<br>
                                                    Downlink Rate: ${agentSta['LastDataDownlinkRate']}<br>
                                                    Uplink Rate: ${agentSta['LastDataUplinkRate']}<br>
                                                    RSSI: ${agentSta['SignalStrength']}<br>
                                                    ${agentSta['IPV4Address'] && agentSta['IPV4Address'] !== '' ? `IPAddress: ${agentSta['IPV4Address']}<br>` : ''}
                                                `,
                                            } 
                                        });

                                        let agentStaColor = getLinkQuality(agentSta['X_SC_LinkQuality']);
                                        let tempLabel = getNonMLOChannels(agentRadio['Channels']);
                                        //link station to agent
                                        if(agentRadioLinkType === '2.4G'){
                                            elements.push({ 
                                                data: { 
                                                    source: `${agent['ID']}`, 
                                                    target: `${agentSta['MACAddress']}`,
                                                    lineStyle: 'dashed',
                                                    lineDashPattern: [4, 24],
                                                    color:  agentStaColor,
                                                    label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                    tooltip: `${tempLabel}`
                                                } 
                                            });
                                        }else if(agentRadioLinkType === '5G'){
                                            elements.push({ 
                                                data: { 
                                                    source: `${agent['ID']}`, 
                                                    target: `${agentSta['MACAddress']}`,
                                                    lineStyle: 'dashed',
                                                    lineDashPattern: [16, 8],
                                                    color:  agentStaColor,
                                                    label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                    tooltip: `${tempLabel}`
                                                }
                                            });
                                        }else{ // 6G
                                            elements.push({
                                                data: {
                                                    source: `${agent['ID']}`,
                                                    target: `${agentSta['MACAddress']}`,
                                                    lineStyle: 'dashed',
                                                    lineDashPattern: [36, 8, 4, 8],
                                                    color:  agentStaColor,
                                                    label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                                    tooltip: `${tempLabel}` 
                                                } 
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        //loop for adding and linking non-MLO client to controller
        for (const radioKey in this.controller['Radios']) {
            if (this.controller['Radios'].hasOwnProperty(radioKey)) {
                const radio = this.controller['Radios'][radioKey];
                let radioLinkType = getWiFiType(radio['Channels']);
                for (const bssKey in radio['BSSs']) {
                    if (radio['BSSs'].hasOwnProperty(bssKey)) {
                    const bss = radio['BSSs'][bssKey];
                        for (const staKey in bss['Stations']) {
                            const sta = bss['Stations'][staKey];
                            if(!mappedIDs.includes(sta['MACAddress']) && bss['BackhaulUse'] != 1){
                                //add station node
                                elements.push({ 
                                    data: { 
                                        id: `${sta['MACAddress']}`, 
                                        label: `${sta['Hostname']}`, 
                                        image: '/assets/images/device.png',
                                        tooltip: ` 
                                            MAC: ${sta['MACAddress']}<br>
                                            PacketsTx: ${sta['PacketsSent']}<br>
                                            PacketsRx: ${sta['PacketsReceived']}<br>
                                            PacketsTxError: ${sta['ErrorsSent']}<br>
                                            PacketsRxError: ${sta['ErrorsReceived']}<br>
                                            Downlink Rate: ${sta['LastDataDownlinkRate']}<br>
                                            Uplink Rate: ${sta['LastDataUplinkRate']}<br>
                                            RSSI: ${sta['SignalStrength']}<br>
                                            ${sta['IPV4Address'] && sta['IPV4Address'] !== '' ? `IPAddress: ${sta['IPV4Address']}<br>` : ''}
                                        `
                                    },
                                });

                                let color = getLinkQuality(sta['X_SC_LinkQuality']);
                                let tempLabel = getNonMLOChannels(radio['Channels']);
                                //link station to controller
                                if(radioLinkType === '2.4G'){
                                    elements.push({ 
                                        data: { 
                                            source: `${this.controller['ID']}`, 
                                            target: `${sta['MACAddress']}`,
                                            lineStyle: 'dashed',
                                            lineDashPattern: [4, 24],
                                            color: color,
                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                            tooltip: `${tempLabel}`
                                        }
                                    });
                                }else if(radioLinkType === '5G'){
                                    elements.push({
                                        data: { 
                                            source: `${this.controller['ID']}`,
                                            target: `${sta['MACAddress']}`,
                                            lineStyle: 'dashed',
                                            lineDashPattern: [16, 8],
                                            color:  color,
                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                            tooltip: `${tempLabel}`
                                        } 
                                    });
                                }else{ // 6G
                                    elements.push({ 
                                        data: { 
                                            source: `${this.controller['ID']}`, 
                                            target: `${sta['MACAddress']}`,
                                            lineStyle: 'dashed',
                                            lineDashPattern: [36, 8, 4, 8],
                                            color:  color,
                                            label: `${tempLabel.replace(/\(2\.4G\)|\(5G\)|\(6G\)/g, '')}`,
                                            tooltip: `${tempLabel}`
                                        } 
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log(`MappedIDs: ${mappedIDs}`);

        // Check the labels to see if they match specific names: HG6244B and RP562B_0123
        // If it does, change the image path
        // [EEM00-1241] Also check if agent has an element with an isEthernet tag...
        let ethernetAgents = [];
        this.controllerImageIsHg = false;
        this.agentImageIsRp = false;
        elements.forEach((elem) => {
            if (elem.data.label.includes('FG4278Bv3')) {
                elem.data.image = '/assets/images/HG6244B.png';
                this.controllerImageIsHg = true;
            }
            if (elem.data.label.includes('RP561B') || elem.data.label.includes('RP562B') || elem.data.label.includes('RP762B')) {
                elem.data.image = '/assets/images/RP562B.png';
                this.agentImageIsRp = true;
            }

            if (elem.data?.isEthernet) {
                ethernetAgents.push(elem.data?.id);
            }

            /* Loop to check if element is ethernet, and check for the SN */
            for (const ethidx in ethernetAgents) {
                if (ethidx === '_super') continue;

                let correctAgentId;
                if (ethernetAgents[ethidx].length === 2) correctAgentId = ethernetAgents[ethidx][0];
                else correctAgentId = ethernetAgents[ethidx];
                if (elem.data?.id && (elem.data?.id.toLowerCase() === correctAgentId.toLowerCase())) {
                    const serialNumber = elem.data?.tooltip.match(/SN:.*?\n/);
                    if (serialNumber && serialNumber[0] && serialNumber !== '') {
                        // If SN is found, change the array element to a "tuple" including SN
                        ethernetAgents[ethidx] = [ethernetAgents[ethidx], serialNumber[0]]
                    }
                }
            }
            /* =========================================================== */
        });

        /* Loop again to replace the Ethernet agent's SN */
        elements.forEach((elem) => {
            for (const ethidx in ethernetAgents) {
                if (ethidx === '_super') continue;

                let correctAgentId;
                if (ethernetAgents[ethidx].length === 2) correctAgentId = ethernetAgents[ethidx][0];
                else correctAgentId = ethernetAgents[ethidx];

                if (elem.data?.id && (elem.data?.id.toLowerCase() === correctAgentId.toLowerCase())) {
                    const serialNumber = elem.data?.tooltip.match(/SN:.*?\n/);
                    /* if the SN doesn't exist, it's the element displayed in the topology, add it */
                    if (!serialNumber) {
                        elem.data.tooltip = elem.data?.tooltip.replace(/(MAC:.*\n)/, `$1${ethernetAgents[ethidx][1]}`);
                    }
                }
            }
        });
        /* ============================================= */

        // ...remove the other stats in the tooltip for ethernet agents
        const rssiRegex = /RSSI:[^\n]*\n/;
        const txRegex = /PacketsTx:[^\n]*\n/;
        const rxRegex = /PacketsRx:[^\n]*\n/;
        const txErrRegex = /PacketsTxError:[^\n]*\n/;
        const rxErrRegex = /PacketsRxError:[^\n]*\n/;
        elements.forEach((elem) => {
            for (const ethidx in ethernetAgents) {
                if (ethidx === '_super') continue;

                let correctAgentId;
                if (ethernetAgents[ethidx].length === 2) correctAgentId = ethernetAgents[ethidx][0];
                else correctAgentId = ethernetAgents[ethidx];
                if (elem.data?.id && (elem.data?.id.toLowerCase() === correctAgentId.toLowerCase())) {
                    elem.data.tooltip = elem.data?.tooltip.replace(rssiRegex, '');
                    elem.data.tooltip = elem.data?.tooltip.replace(txRegex, '');
                    elem.data.tooltip = elem.data?.tooltip.replace(rxRegex, '');
                    elem.data.tooltip = elem.data?.tooltip.replace(txErrRegex, '');
                    elem.data.tooltip = elem.data?.tooltip.replace(rxErrRegex, '');
                }
            }
        })

        const cy = cytoscape({
            container: document.getElementById('cy'), 
            elements: elements, 
            style: [ 
                {
                    selector: 'node',
                    style: {
                        'shape': 'rectangle',
                        'background-image': 'data(image)',
                        'background-fit': 'contain',
                        'label': 'data(label)',
                        'background-opacity': 1,
                        'background-color': 'white',
                        'padding': 30,
                        'text-halign': 'right', 
                        'text-valign': 'center', 
                        'text-margin-x': 10,
                        'text-wrap': 'wrap', 
                        'text-max-width': 200,
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 4,
                        'line-color': 'data(color)',
                        'line-style': 'data(lineStyle)',
                        'line-dash-pattern': 'data(lineDashPattern)',
                        'label': 'data(label)',
                    }
                }
            ],
            layout: {
                name: 'breadthfirst', // Use 'breadthfirst' layout for tree structure
                directed: true,
                spacingFactor: 1.1,
                nodeDimensionsIncludeLabels: true, 
                avoidOverlap: true,
            }
        });

        // Add Qtip tooltips to nodes
        const tooltip = document.getElementById('cy-tooltip');

        cy.on('mouseover', 'node', (event) => {
            const { x, y } = event.renderedPosition;
            const tooltipText = event.target.data('tooltip');
            if (!tooltipText) {
                    tooltip.style.display = 'none';
                    return;
        }
            tooltip.style.display = 'block';
            tooltip.style.left = `${x + 110}px`;
            tooltip.style.top = `${y + 50}px`;
            tooltip.innerHTML = tooltipText;
        });

        cy.on('mouseover', 'edge', (event) => {
            const { x, y } = event.renderedPosition;
            const tooltipText = event.target.data('tooltip');
            if (!tooltipText) {
                    tooltip.style.display = 'none';
                    return;
        }
            tooltip.style.display = 'block';
            tooltip.style.left = `${x + 150}px`;
            tooltip.style.top = `${y + 150}px`;
            tooltip.innerHTML = tooltipText;
        });
    
        cy.on('mouseout', 'node, edge', () => {
            tooltip.style.display = 'none';
        });

        cy.on('drag', 'node, edge', () => {
            tooltip.style.display = 'none';
        });

        cy.on('pan', () => {
            tooltip.style.display = 'none';
        });

        //console.log("Elements", elements);
        //console.log("Controller", this.controller);
        //console.log("Agents", this.agents);
        // //console.log("APMLDs", this.controller['APMLDs']);

    }
    @action
    setupInterval() {
        this.generateNodes();
        set(this, 'intervalId', later(this, this.updateNodes, 5000));
    }

    willDestroyElement() {
        super.willDestroyElement(...arguments);
        cancel(this.intervalId);
    }

    updateNodes() {
        if (this.isDestroyed || this.isDestroying) {
            return;
        }
        this.generateNodes();
        set(this, 'intervalId', later(this, this.updateNodes, 5000));
    }
willDestroyElement() {
    super.willDestroyElement(...arguments);
    cancel(this.intervalId);
    if (this.cyInstance) {
        this.cyInstance.destroy(); // Destroy the Cytoscape instance
        this.cyInstance = null;
    }
}
}