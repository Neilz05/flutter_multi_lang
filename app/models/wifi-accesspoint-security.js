import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class WifiAccesspointSecurityModel extends BaseModel {
  static sanitizedFields = ['KeyPassPhrase']; // leave empty to sanitize all strings

  @attr EncryptionMode;
  @attr KeyPassPhrase;
  @attr MFPConfig;
  @attr ModeEnabled;
  @attr ModesAvailable;
  @attr ModesSupported;
  @attr OWETransitionInterface;
  @attr PreSharedKey;
  @attr RadiusCalledStationId;
  @attr RadiusChargeableUserId;
  @attr RadiusDefaultSessionTimeout;
  @attr RadiusNASIdentifier;
  @attr RadiusOwnIPAddress;
  @attr RadiusSecret;
  @attr RadiusServerIPAddr;
  @attr RadiusServerPort;
  @attr RekeyingInterval;
  @attr SAEPassphrase;
  @attr SHA256Enable;
  @attr SPPAmsdu;
  @attr TransitionDisable;
  @attr WEPKey;
  @attr X_FASTWEB_Allow;
  @attr X_FASTWEB_MaximumTime;
}
