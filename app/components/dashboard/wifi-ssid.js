import Component from '@glimmer/component';

export default class DashboardWifiSsidComponent extends Component {
  get packetData() {
    let data = [];
    let last = null;
    this.args.packetData
      .filterBy('alias', this.args.ap.get('SSIDReference.Alias'))
      .forEach((entry) => {
        if (last) {
          // get the time difference between entries
          let seconds = (entry.timestamp - last.timestamp) / 1000;
          
          data.push({
            sPackets: (entry.sPackets - last.sPackets) / seconds,
            rPackets: (entry.rPackets - last.rPackets) / seconds,
            sBytes: (entry.sBytes - last.sBytes) / seconds,
            rBytes: (entry.rBytes - last.rBytes) / seconds,
          });
        }
        last = entry;
      });
    return data;
  }
}
