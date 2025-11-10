class DeviceInfo {
  DeviceInfo({required this.parameters, required this.path});

  factory DeviceInfo.fromJson(json, {String? sourceUrl}) {
    if (json is List && json.isNotEmpty) {
      json = json[0]; // Get the first item, testing for now
    }
    return DeviceInfo(
      parameters: Map<String, dynamic>.from(json['parameters'] as Map),
      path: json['path'] as String,
    );
  }
  final Map<String, dynamic> parameters;
  final String path;

  // helper getters
  String get lowerLayers =>
      (parameters['LowerLayers'].isEmpty) ? '-' : parameters['LowerLayers'];
  // String get DeviceCategory => (parameters['DeviceCategory'].isEmpty)
  // ? '-'
  // : parameters['DeviceCategory'];
  String get DeviceCategory => parameters['DeviceCategory'] ?? '-';
  int get UpTime => parameters['UpTime'] ?? 0;
  String get AdditionalHardwareVersion =>
      parameters['AdditionalHardwareVersion'] ?? '-';
  String get FirstUseDate => parameters['FirstUseDate'] ?? '-';
  int get DeviceImageNumberOfEntries =>
      parameters['DeviceImageNumberOfEntries'] ?? 0;
  String get ModelNumber => parameters['ModelNumber'] ?? '-';
  String get BootFirmwareImage => parameters['BootFirmwareImage'] ?? '-';
  String get ActiveFirmwareImage => parameters['ActiveFirmwareImage'] ?? '-';
  int get FirmwareImageNumberOfEntries =>
      parameters['FirmwareImageNumberOfEntries'] ?? 0;
  String get SoftwareVersion => parameters['SoftwareVersion'] ?? '-';
  int get ProcessorNumberOfEntries =>
      parameters['ProcessorNumberOfEntries'] ?? 0;
  String get CID => parameters['CID'] ?? '-';
  int get VendorLogFileNumberOfEntries =>
      parameters['VendorLogFileNumberOfEntries'] ?? 0;
  String get AdditionalSoftwareVersion =>
      parameters['AdditionalSoftwareVersion'] ?? '-';
  String get Description => parameters['Description'] ?? '-';
  String get SerialNumber => parameters['SerialNumber'] ?? '-';
  String get ProductClass => parameters['ProductClass'] ?? '-';
  String get HardwareVersion => parameters['HardwareVersion'] ?? '-';
  String get ModelName => parameters['ModelName'] ?? '-';
  String get Manufacturer => parameters['Manufacturer'] ?? '-';
  String get X_PRPLWARE_COM_ClonedMACAddress =>
      parameters['X_PRPLWARE-COM_ClonedMACAddress'] ?? '-';
  String get ManufacturerOUI => parameters['ManufacturerOUI'] ?? '-';
  String get ProvisioningCode => parameters['ProvisioningCode'] ?? '-';
  String get PEN => parameters['PEN'] ?? '-';
  String get FriendlyName => parameters['FriendlyName'] ?? '-';
  int get VendorConfigFileNumberOfEntries =>
      parameters['VendorConfigFileNumberOfEntries'] ?? 0;
  int get LocationNumberOfEntries => parameters['LocationNumberOfEntries'] ?? 0;
}
