import 'package:flutter_application_1/models/speed_test.dart';
// import 'package:flutter_application_1/providers/speed_test_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter_speed_test_plus/flutter_speed_test_plus.dart';
// import 'package:flutter_internet_speed_test/models/test_result.dart';

class SpeedTestViewModel extends StateNotifier<AsyncValue<SpeedTest>> {
  SpeedTestViewModel() : super(const AsyncLoading()) {
    startSpeedTest();
  }

  void _updateSpeedTest({
    double? downloadSpeed,
    double? uploadSpeed,
    double? speed,
  }) {
    final prev =
        state.value ??
        SpeedTest(downloadSpeed: 0.0, uploadSpeed: 0.0, speed: 0.0);
    state = AsyncValue.data(
      SpeedTest(
        downloadSpeed: downloadSpeed ?? prev.downloadSpeed,
        uploadSpeed: uploadSpeed ?? prev.uploadSpeed,
        speed: speed ?? prev.speed,
      ),
    );
  }

  void resetSpeedTest() {
    state = AsyncValue.data(
      SpeedTest(downloadSpeed: 0.0, uploadSpeed: 0.0, speed: 0.0),
    );
  }

  Future<void> startSpeedTest() async {
    final speedTest = FlutterInternetSpeedTest();
    speedTest.startTesting(
      useFastApi: true,
      onStarted: () {},
      onCompleted: (TestResult download, TestResult upload) {},
      onProgress: (double percent, TestResult data) {
        _updateSpeedTest(speed: data.transferRate);
      },
      onError: (String errorMessage, String speedTestError) {},
      onDownloadComplete: (TestResult data) {
        _updateSpeedTest(downloadSpeed: data.transferRate);
      },
      onUploadComplete: (TestResult data) {
        _updateSpeedTest(uploadSpeed: data.transferRate);
      },
      onCancel: () {},
    );
  }

  // ...existing code...
}
