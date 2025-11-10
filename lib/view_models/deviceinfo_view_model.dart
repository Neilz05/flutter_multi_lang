import 'dart:convert';
import 'package:flutter_application_1/models/deviceinfo.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_riverpod/flutter_riverpod.dart';

// class DeviceInfoViewModel extends StateNotifier<AsyncValue<DeviceInfo>> {
class DeviceInfoViewModel {
  final http.Client client;
  DeviceInfoViewModel(this.client);
  // final String baseUrl = 'http://192.168.1.1';
  final String baseUrl = 'http://localhost:5000';
  Future<DeviceInfo> fetchRouterStatus() async {
    print("????");
    final uri = Uri.parse('$baseUrl/serviceElements/Device.DeviceInfo.');
    final response = await client.get(uri);
    if (response.statusCode == 200) {
      // print(response.body);
      print(
        'using getter function: ${DeviceInfo.fromJson(json.decode(response.body))}',
      );
      return DeviceInfo.fromJson(json.decode(response.body));
    } else {
      print('response status code is ${response.statusCode}');
      throw Error();
    }
  }
}
