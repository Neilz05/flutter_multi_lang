// import 'dart:io';

import 'dart:convert';
import 'package:flutter_application_1/models/api_status.dart';
import 'package:http/http.dart' as http;

class ApiStatusViewModel {
  final http.Client client;
  ApiStatusViewModel(this.client);
  // final String baseUrl = 'http://192.168.1.1';
  final String baseUrl = 'http://localhost:5000';
  Future<ApiStatus> fetchRouterStatus() async {
    final uri = Uri.parse('$baseUrl/serviceElements/Device.Logical.Interface.');
    final response = await client.get(uri);
    if (response.statusCode == 200) {
      // print(response.body);
      print(
        'using getter function: ${ApiStatus.fromJson(json.decode(response.body)).lowerLayers}',
      );
      return ApiStatus.fromJson(json.decode(response.body));
    } else {
      print('response status code is ${response.statusCode}');
      throw Error();
    }
  }
}
