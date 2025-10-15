import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';

class Fact {
  Fact({required this.text});

  factory Fact.fromJson(Map<String, Object?> json) {
    return Fact(text: json['text']! as String);
  }

  final String text;
}

final dio = Dio();

Future<Fact> fetchRandomFact() async {
  // Fetching a random joke from a public API
  try {
    final response = await dio.get<Map<String, Object?>>(
      'https://uselessfacts.jsph.pl/api/v2/facts/today',
    );
    return Fact.fromJson(response.data!);
  } catch (e) {
    print('Error: $e');
    rethrow;
  }
}

final factProvider = FutureProvider<Fact>((ref) async {
  return fetchRandomFact();
});
