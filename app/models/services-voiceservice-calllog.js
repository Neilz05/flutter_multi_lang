import Model, { attr, hasMany } from '@ember-data/model';

export default class ServicesVoiceserviceCallLog extends Model {
    @attr Alias  
    @attr CallTerminationCause  
    @attr CalledPartyNumber  
    @attr CallingPartyNumber  
    @attr Destination  
    @attr Direction  
    @attr Duration  
    @attr RemoteParty  
    @attr SessionNumberOfEntries  
    @attr SignalingPerformanceNumberOfEntries  
    @attr Source  
    @attr Start  
    @attr UsedExtensions  
    @attr UsedLine  
    @attr "X_PRPLWARE-COM_Active" 
    @attr "X_PRPLWARE-COM_Date" 
    @attr "X_PRPLWARE-COM_Time" 
}
