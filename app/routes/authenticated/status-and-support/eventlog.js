import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import RSVP, { resolve } from 'rsvp';

export default class AuthenticatedStatusAndSupportSystemLogRoute extends Route {
  @service session;
  @service store;

  regexPatterns = [
    {
      category: 'WAN',
      regex: /^(kernel: .*eth[0-9]|tr181-dhcpv4client:|gmap-client:|pppd\[\d+\]:|netmodel-clients:|tr181-dns:|tr181-voip:|pppoe-wan|dslite0|veip0)/
    },
    {
      category: 'LAN',
      regex: /^(kernel: .*br-lan|kernel: .*wl[0-9]|hostapd:|wld:|wl[0-9]:|wl[0-9]\..*:|wl[0-9]_.*:|wl[0-9]\..*\.|wl[0-9]_.*\.)/
    },
    {
      category: 'Voice',
      regex: /(tr181-voip:|Voice\.)/
    },
    {
      category: 'Data',
      regex: /(tr181-dhcpv4client:|netmodel:|tr181-ipdiagnostics:|tr181-dns:|tr181-logical:|tr181-dynamicdns:|tr181-led:|tr181-device:|tr181-usermanagement:)/
    },
    {
      category: 'UMTS',
      regex: /^(tr181-umts:|umts-)/
    },
    {
      category: 'Firewall',
      regex: /^(tr181-firewall:|kernel: .*Firewall|kernel: .*NFLOG|kernel: .*NFQUEUE|kernel: .*iptables)/
    },
    {
      category: 'USB',
      regex: /(kernel: .*usb|usb-storage:|usb-moded:|usbnet:)/
    },
    {
      category: 'System',
      regex: /^(tr181-|ba-cli:|procd:|crond\[|ssh_server:|obuspa\[|netmodel:|amx_init:|deviceinfo-manager:|chronyd\[\d+\]:|time-system:|time-manager:|kernel: (?!.*wlan|.*br-lan|.*wl[0-9]|.*eth[0-9]|.*Firewall))/

    },
    {
      category: 'Mesh',
      regex: /^(mesh: scmesh)/
    }
  ]

  CategoryForString(str) {
    const match = this.regexPatterns.find(item => item.regex.test(str));
    return match ? match.category : null;
  }

  LogTypeForString(str) {
    return RegExp('\[\!\]|\[x\]').test(str) == true ? 'we' : ''
  }

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.eventlog');
  }

  model() {
    return this.store.findRecord('syslog-action-logfile', 'Syslog.Action.messages.LogFile.').then(
      (data) => {
        if (!data || !data.FilePath)
          throw new Error('No data returned or Data has no Parameter "FilePath"')

        const path = data.FilePath.replace('file://', '')
        return fetch(path,
          {
            method: "GET",
            headers: {
              "Accept": "text/plain;charset=utf-8",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              "Pragma": "no-cache",
              "Expires": "0",
              "Authorization": 'bearer ' + this.session.data.authenticated.sessionID,
              "X-CSRF-Token": sessionStorage.getItem('csrf_token') || ''
            }
          }
        )
          .then(response => {
            if (!response.ok)
              throw new Error(`Failed to fetch log file: ${response.status} ${response.statusText}`)

            return response.text()
          })
          .then(text => {
            if (!text)
              throw new Error('Log file is empty or cannot be parsed.')
            return text.split('\n')
          })
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              // split [0] is date
              // split [1] is the log

              const split = data[i].split(/\s+/)
              //let category = this.getCategoryForString(split[1])
              const timestamp = split.slice(0, 4).join(' ');
              const logMessage = split.slice(5).join(' ');

              data[i] = {
                timestamp: timestamp,
                logdata: logMessage,
                category: this.CategoryForString(logMessage),
                logtype: this.LogTypeForString(logMessage)
              }
            }
            data.reverse()
            return data
          })
          .catch(error => {
            console.error('Error in fetching data: ', error)
            return [];
          })
      }
    )
    //let path = this.store.peekRecord('syslog-action-logfile', ``).FilePath.replace('file://', '')
    //const response = await fetch 
  }


  /* async fetchlog(id, alias){
    //let log_filename = this.store.peekRecord('syslog-action-logfile', `${id}LogFile.`).FilePath.split("/").pop()
    //let path = `/assets/${log_filename}` // should they choose to copy the log files to assets. 
    //let path = `/assets/log/${log_filename}` // should they choose to copy it to a folder inside assets (named log)
    
    let path = this.store.peekRecord('syslog-action-logfile', `${id}LogFile.`).FilePath.replace('file://', '')
    console.log(path)
    
    let logdata = [] 

    const response = await fetch(path, 
      {
        method: "GET",
        headers: {
          "Accept": "text/plain;charset=utf-8",
          "Authorization": 'bearer ' + this.session.data.authenticated.sessionID,
        }
      }
    )

    let data = await response.text()
    data = data.split('\n')
    data.forEach(element => {
      let split_entry = element.split('prplOS')
      if (split_entry[1]){
        logdata.push({
          date: split_entry[0],
          log: split_entry[1],
          category: alias,
          logtype: (function() {  // Immediately Invoked Function Expression (IIFE)
            
          })()
        })
      }
    })
    console.log(`${alias} has ${logdata.length} entries:`, logdata)
    return logdata
  }

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.eventlog');
    return RSVP.hash({
      a: this.store.findAll('syslog-action-logfile').then((res) => resolve(res)),
      b: this.store.findAll('syslog-action').then((res) => resolve(res))
    })
  }

  async model() {
    const results = await Promise.allSettled(this.store.peekAll('syslog-action')
      .map(e => this.fetchlog(e.id, e.Alias)));
    return results
      .filter(result => result.status === "fulfilled")
      .map(result_1 => result_1.value)
      .flat()
      
  } */


}
