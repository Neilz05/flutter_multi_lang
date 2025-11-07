// import 'dart:io';

import 'package:dio/dio.dart';
import 'dart:convert';
import 'package:flutter_application_1/models/api_status.dart';
import 'package:http/http.dart' as http;

final dio = Dio();

// Future<ApiStatus> fetchRouterStatus(Dio dio) async {
//   try {
//     final response = await dio.get('http://192.168.1.1/api/status');
//     print(ApiStatus.fromJson(response.data).active);
//     // return ApiStatus.fromJson(response.data);
//     return ApiStatus.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
//     // print(response.data); // Handle the response
//   } catch (e) {
//     print('Error: $e');
//     rethrow;
//   }
// }

// Future<ApiStatus> fetchRouterStatus(http.Client client) async {
//   final response = await client.get(Uri.parse('http://192.168.1.1/api/status'));

//   if (response.statusCode == 200) {
//     // If the server did return a 200 OK response,
//     // then parse the JSON.
//     return ApiStatus.fromJson(
//       jsonDecode(response.body) as Map<String, dynamic>,
//     );
//   } else {
//     // If the server did not return a 200 OK response,
//     // then throw an exception.
//     throw Exception('Failed to load ApiStatus');
//   }
// }

class ApiStatusViewModel {
  final http.Client client;
  ApiStatusViewModel(this.client);
  // final String baseUrl = 'http://192.168.1.1';
  final String baseUrl = 'http://localhost:5000';
  Future<ApiStatus> fetchRouterStatus() async {
    // Future<ApiStatus> fetchRouterStatus(http.Client client) async {
    //   final response = await client.get(
    //     Uri.parse('http://192.168.1.1/api/status'),
    // );

    // if (response.statusCode == 200) {
    //   // If the server did return a 200 OK response,
    //   // then parse the JSON.
    //   return ApiStatus.fromJson(
    //     jsonDecode(response.body) as Map<String, dynamic>,
    //   );
    // } else {
    //   // If the server did not return a 200 OK response,
    //   // then throw an exception.
    //   throw Exception('Failed to load ApiStatus');
    // }
    // final uri = Uri.parse('$baseUrl/api/status');
    final uri = Uri.parse('$baseUrl/serviceElements/Device.DeviceInfo.');
    // final uri = Uri.parse('$baseUrl/api/users');
    // final uri = Uri.parse('/serviceElements/DeviceInfo.');
    final response = await client.get(uri);
    if (response.statusCode == 200) {
      print(response.body);
      return ApiStatus.fromJson(json.decode(response.body));
    } else {
      print('response status code is ${response.statusCode}');
      throw Error();
    }
  }
}
