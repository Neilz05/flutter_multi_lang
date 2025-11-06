import Model, { attr } from '@ember-data/model';

export default class XponOnuAniTransceiverModel extends Model {
  @attr Bias;	
  @attr Connector;	
  @attr ID;
  @attr Identifier;		
  @attr NominalBitRateDownstream;		
  @attr NominalBitRateUpstream;		
  @attr PONMode;		
  @attr RxPower;
  @attr Temperature;
  @attr TxPower;
  @attr VendorName;		
  @attr VendorPartNumber;		
  @attr VendorRevision;	
  @attr Voltage;
}