import 'dart:io' show Platform;

import 'package:android_intent_plus/android_intent.dart';
import 'package:open_settings_plus/open_settings_plus.dart';

import 'package:flutter/material.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:flutter_application_1/wifi_qr_page.dart';
import 'package:flutter_application_1/wifi_speed_test.dart';

//practice to make a welcome page for wifi connection similar to the one in sercomm_app
class WifiWelcomePage extends StatelessWidget {
  const WifiWelcomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('WiFi Welcome')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Welcome!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),

            // Add more widgets here
            Spacer(),
            Center(
              child: Column(
                children: [
                  PrimaryElevatedButton(
                    text: "Connect via QR",
                    onPressed: () {
                      navigateTo(context, WifiQrPage());
                      // TODO: navigate to QR code scanner
                    },
                  ),
                  PrimaryElevatedButton(
                    text: "Manual Connect",
                    onPressed: () {
                      if (Platform.isAndroid) {
                        final intent = AndroidIntent(
                          action: 'android.settings.WIFI_SETTINGS',
                        );
                        intent.launch();
                      } else if (Platform.isIOS) {
                        //since there is no direct way to open wifi settings in iOS, we use open_settings_plus package
                        OpenSettingsPlusIOS settings = OpenSettingsPlusIOS();
                        settings
                            .wifi(); // should open the wifi settings, can't test in simulation since wifi is not shown in the settings
                      }
                    },
                  ),

                  PrimaryElevatedButton(
                    text: "Speed Test",
                    onPressed: () {
                      navigateTo(context, WifiSpeedTest());
                    },
                  ),
                ],
              ),
            ),
            SizedBox(height: spacing48),
          ],
        ),
      ),
    );
  }
}
