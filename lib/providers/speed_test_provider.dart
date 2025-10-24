import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter_application_1/models/speed_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_application_1/view_models/speed_test_view_model.dart';

final speedTestProvider =
    StateNotifierProvider<SpeedTestViewModel, AsyncValue<SpeedTest>>((ref) {
      return SpeedTestViewModel();
    });
