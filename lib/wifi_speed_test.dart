import 'package:flutter/material.dart';
import 'package:flutter_speed_test_plus/flutter_speed_test_plus.dart';

class WifiSpeedTest extends StatelessWidget {
  const WifiSpeedTest({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('WiFi Speed Test')),
      body: Center(
        child: ElevatedButton(
          // onPressed: () async {
          //   final speedTest = FlutterInternetSpeedTest();
          //   final downloadSpeed = await speedTest.startDownloadTesting(onProgress: (percent, speed) {
          //     print('Download Progress: $percent%, Speed: $speed Mbps');
          //   });
          //   final uploadSpeed = await speedTest.startUploadTesting(onProgress: (percent, speed) {
          //     print('Upload Progress: $percent%, Speed: $speed Mbps');
          //   });
          //   print('Final Download Speed: $downloadSpeed Mbps');
          //   print('Final Upload Speed: $uploadSpeed Mbps');
          // },
          onPressed: startSpeedTest,
          child: Text('Start Speed Test'),
        ),
      ),
    );
  }
}

void startSpeedTest() {
  final speedTest = FlutterInternetSpeedTest();
  speedTest.startTesting(
    useFastApi: true, // true by default, uses Fast.com API
    onStarted: () {
      print('Speed test started');
    },
    onCompleted: (TestResult download, TestResult upload) {
      print('Download Speed: ${download.transferRate} Mbps');
      print('Upload Speed: ${upload.transferRate} Mbps');
    },
    onProgress: (double percent, TestResult data) {
      print("${data.transferRate} Mbps");
      print('Progress: $percent%');
    },
    onError: (String errorMessage, String speedTestError) {
      print('Error: $errorMessage');
    },
    onDownloadComplete: (TestResult data) {
      print('Download complete: ${data.transferRate} Mbps');
    },
    onUploadComplete: (TestResult data) {
      print('Upload complete: ${data.transferRate} Mbps');
    },
    onCancel: () {
      print('Test cancelled');
    },
  );
}
