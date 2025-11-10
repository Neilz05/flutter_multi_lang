class ApiStatus {
  ApiStatus({required this.parameters, required this.path});

  factory ApiStatus.fromJson(json) {
    if (json is List && json.isNotEmpty) {
      json = json[0]; // Get the first item, testing for now
    }
    return ApiStatus(
      parameters: Map<String, dynamic>.from(json['parameters'] as Map),
      path: json['path'] as String,
    );
  }
  final Map<String, dynamic> parameters;
  final String path;

  // helper getters
  String get lowerLayers => parameters['LowerLayers'] ?? '-';
  String get alias => parameters['Alias'] ?? '-';
}
