import 'package:flutter/material.dart';
import 'package:flutter_application_1/constants.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'widgets/widgets.dart';

final storage = FlutterSecureStorage();

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text('Second Page'),
      ),
      body: PaddedContainer(
        padding: EdgeInsets.symmetric(horizontal: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 16),
            PaddedContainer(
              child: Text(
                'Settings',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
            SizedBox(height: 16),
            PaddedContainer(
              color: Colors.white,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Enable Feature X'),
                  OptionSwitch(
                    initialValue: true,
                    onChanged: (val) {
                      if (val) {}
                    },
                  ),
                ],
              ),
            ),
            PaddedContainer(
              color: Colors.white,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Enable Feature Y'),
                  OptionSwitch(
                    initialValue: false,
                    onChanged: (val) {
                      if (val) {}
                    },
                  ),
                ],
              ),
            ),
            SizedBox(height: 16), // Add some spacing
            PaddedContainer(
              child: PrimaryButton(onPressed: () {}, text: 'Apply'),
            ),
            // Add more settings options here
          ],
        ),
      ),
    );
  }
}
