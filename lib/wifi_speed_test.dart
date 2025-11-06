// import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:flutter_speed_test_plus/flutter_speed_test_plus.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';
import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/providers/speed_test_provider.dart';

class WifiSpeedTest extends ConsumerStatefulWidget {
  // class WifiSpeedTest extends StatefulWidget {
  const WifiSpeedTest({super.key});

  @override
  ConsumerState<WifiSpeedTest> createState() => _WifiSpeedTestState();
}

class _WifiSpeedTestState extends ConsumerState<WifiSpeedTest> {
  // class _WifiSpeedTestState extends State<WifiSpeedTest> {
  double speed = 0;
  double downloadSpeed = 0;
  double uploadSpeed = 0;

  @override
  Widget build(BuildContext context) {
    final speedTest = ref.watch(speedTestProvider);
    speed = speedTest.when(
      data: (value) => value.speed,
      loading: () => 0.0,
      error: (_, __) => 0.0,
    );
    downloadSpeed = speedTest.when(
      data: (value) => value.downloadSpeed,
      loading: () => 0.0,
      error: (_, __) => 0.0,
    );
    uploadSpeed = speedTest.when(
      data: (value) => value.uploadSpeed,
      loading: () => 0.0,
      error: (_, __) => 0.0,
    );
    return Scaffold(
      appBar: AppBar(title: Text(context.lang.wifiSpeedTest)),
      body: Center(
        child: ListView(
          padding: EdgeInsets.all(spacing16),
          children: [
            SpeedTestWidget(speed: speed),
            Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Column(
                    children: [
                      Row(
                        children: [
                          Icon(Icons.download, size: 20),
                          const HorizontalSpacing(width: spacing8),
                          Text(context.lang.wifiDownloadSpeed),
                        ],
                      ),
                      Text(
                        "$downloadSpeed Mbps",
                        style: TextStyle(fontSize: 24),
                      ),
                    ],
                  ),
                  const HorizontalSpacing(width: spacing48),
                  Column(
                    children: [
                      Row(
                        children: [
                          Icon(Icons.upload, size: 20),
                          const HorizontalSpacing(width: spacing8),
                          Text(context.lang.wifiUploadSpeed),
                        ],
                      ),
                      Text("$uploadSpeed Mbps", style: TextStyle(fontSize: 24)),
                    ],
                  ),
                ],
              ),
            ),
            VerticalSpacing(height: spacing16),
            PrimaryElevatedButton(
              onPressed: () {
                ref.read(speedTestProvider.notifier).resetSpeedTest();
                ref.read(speedTestProvider.notifier).startSpeedTest();
              },
              text: context.lang.wifiStartSpeedTest,
            ),
          ],
        ),
      ),
    );
  }

  // void startSpeedTest() {
  //   final speedTest = FlutterInternetSpeedTest();
  //   speedTest.startTesting(
  //     useFastApi: true, // true by default, uses Fast.com API
  //     onStarted: () {
  //       print('Speed test started');
  //     },
  //     onCompleted: (TestResult download, TestResult upload) {
  //       print('Download Speed: ${download.transferRate} Mbps');
  //       print('Upload Speed: ${upload.transferRate} Mbps');
  //     },
  //     onProgress: (double percent, TestResult data) {
  //       print("${data.transferRate} Mbps");
  //       print("${data.type} is the data type");
  //       print('Progress: $percent%');
  //       setState(() {
  //         speed = data.transferRate;
  //       });
  //     },
  //     onError: (String errorMessage, String speedTestError) {
  //       print('Error: $errorMessage');
  //     },
  //     onDownloadComplete: (TestResult data) {
  //       setState(() {
  //         finalDownloadSpeed = data.transferRate;
  //       });
  //       print('Download complete: ${data.transferRate} Mbps');
  //     },
  //     onUploadComplete: (TestResult data) {
  //       setState(() {
  //         finalUploadSpeed = data.transferRate;
  //       });
  //       print('Upload complete: ${data.transferRate} Mbps');
  //     },
  //     onCancel: () {
  //       print('Test cancelled');
  //     },
  //   );
  // }
}

class SpeedTestWidget extends StatelessWidget {
  const SpeedTestWidget({super.key, required double speed}) : speed = speed;

  final double speed;

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: <RadialAxis>[
        RadialAxis(
          minimum: 0,
          maximum: 500,
          ranges: <GaugeRange>[
            GaugeRange(
              startValue: 0,
              endValue: speed,
              color: Theme.of(context).colorScheme.primary,
            ),
          ],
          pointers: <GaugePointer>[NeedlePointer(value: speed)],
          annotations: <GaugeAnnotation>[
            GaugeAnnotation(
              widget: Container(
                child: Text(
                  '${speed.toStringAsFixed(2)} Mbps',
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                ),
              ),
              angle: 90,
              positionFactor: 0.5,
            ),
          ],
        ),
      ],
    );
  }
}
