class ApiStatus {
  ApiStatus({required this.active});

  factory ApiStatus.fromJson(Map<String, Object?> json) {
    // return ApiStatus(active: json['active']! as bool);
    return ApiStatus(active: json['username'] as String);
  }

  final String active;
}
