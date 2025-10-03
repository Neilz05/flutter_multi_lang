import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:flutter_speed_test_plus/flutter_speed_test_plus.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';
import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';

class WifiSpeedTest extends StatefulWidget {
  const WifiSpeedTest({super.key});

  @override
  State<WifiSpeedTest> createState() => _WifiSpeedTestState();
}

class _WifiSpeedTestState extends State<WifiSpeedTest> {
  double speed = 0;
  double finalDownloadSpeed = 0;
  double finalUploadSpeed = 0;

  void clearState() {
    setState(() {
      speed = 0.0;
      finalDownloadSpeed = 0.0;
      finalUploadSpeed = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(context.lang.wifiSpeedTest)),
      body: Center(
        child: ListView(
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
                          SizedBox(width: 8),
                          Text(context.lang.wifiDownloadSpeed),
                        ],
                      ),
                      Text(
                        "$finalDownloadSpeed Mbps",
                        style: TextStyle(fontSize: 24),
                      ),
                    ],
                  ),
                  SizedBox(width: spacing48),
                  Column(
                    children: [
                      Row(
                        children: [
                          Icon(Icons.upload, size: 20),
                          SizedBox(width: 8),
                          Text(context.lang.wifiUploadSpeed),
                        ],
                      ),
                      Text(
                        "$finalUploadSpeed Mbps",
                        style: TextStyle(fontSize: 24),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: spacing24),
            PrimaryElevatedButton(
              onPressed: () {
                clearState();
                startSpeedTest();
              },
              text: context.lang.wifiStartSpeedTest,
            ),
          ],
        ),
      ),
    );
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
        print("${data.type} is the data type");
        print('Progress: $percent%');
        setState(() {
          speed = data.transferRate;
        });
      },
      onError: (String errorMessage, String speedTestError) {
        print('Error: $errorMessage');
      },
      onDownloadComplete: (TestResult data) {
        setState(() {
          finalDownloadSpeed = data.transferRate;
        });
        print('Download complete: ${data.transferRate} Mbps');
      },
      onUploadComplete: (TestResult data) {
        setState(() {
          finalUploadSpeed = data.transferRate;
        });
        print('Upload complete: ${data.transferRate} Mbps');
      },
      onCancel: () {
        print('Test cancelled');
      },
    );
  }
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
              color: Colors.blueAccent,
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
