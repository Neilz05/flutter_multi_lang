import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:dio/dio.dart';
import 'package:flutter_application_1/view_models/api_status_view_model.dart';
import 'dart:async';

import 'package:mockito/annotations.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/models/api_status.dart';
import 'api_status_test.mocks.dart';

// Create a mock Dio class
class MockDio extends Mock implements Dio {}

// void main() {
//   test('fetchRouterStatus prints response data', () async {
//     final mockDio = MockDio();
//     final mockResponse = Response(
//       data: {'status': 'ok'},
//       requestOptions: RequestOptions(path: ''),
//       statusCode: 200,
//     );

//     // Set up the mock to return the mockResponse
//     when(
//       mockDio.get('http://192.168.1.1/api/status'),
//     ).thenAnswer((_) async => mockResponse);
//     expect(prints, contains('{"status":"ok"}'));
//   });
// }

@GenerateMocks([http.Client])
void main() {
  late MockClient mockClient;
  late ApiStatusViewModel apiStatusViewModel;

  setUp(() {
    mockClient = MockClient();
    apiStatusViewModel = ApiStatusViewModel(mockClient);
  });
  test('fetchRouterStatus returns ApiStatus on successful response', () async {
    final mockResponse = http.Response('{"active": "true"}', 200);

    // Set up the mock to return the mockResponse
    when(
      mockClient.get(Uri.parse('http://192.168.1.1/api/status')),
    ).thenAnswer((_) async => mockResponse);

    // Call the method
    final result = await apiStatusViewModel.fetchRouterStatus();

    // Verify the result
    expect(result, isA<ApiStatus>());
    // expect(result.active, isTrue);
  });
}
