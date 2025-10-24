import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter_application_1/models/fact.dart';
import 'package:dio/dio.dart';

class FactViewModel extends StateNotifier<AsyncValue<Fact>> {
  FactViewModel() : super(const AsyncLoading()) {
    fetchFact();
  }
  final dio = Dio();

  Future<void> fetchFact() async {
    try {
      final response = await dio.get<Map<String, Object?>>(
        // 'https://uselessfacts.jsph.pl/api/v2/facts/today',
        'https://uselessfacts.jsph.pl/api/v2/facts/random',
      );
      state = AsyncData(Fact.fromJson(response.data!));
      // state is a special property of StateNotifier in Riverpod.
    } catch (e, st) {
      state = AsyncError(e, st);
    }
  }
}
