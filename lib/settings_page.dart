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
      appBar: AppBar(backgroundColor: primaryColor, title: Text('Second Page')),
      body: PaddedContainer(
        padding: EdgeInsets.symmetric(horizontal: 0),
        child: ListView(
          children: [
            SizedBox(height: spacing_16),
            PaddedContainer(
              child: Text(
                'Settings',
                style: TextStyle(
                  fontSize: subtitleTextSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(height: spacing_16),
            SettingsRow(
              text: 'Enable Feature X',
              trailing: OptionSwitch(initialValue: true, onChanged: (val) {}),
            ),
            SettingsRow(
              text: 'Enable Feature Y',
              trailing: OptionSwitch(initialValue: false, onChanged: (val) {}),
            ),
            SizedBox(height: spacing_16), // Add some spacing
            PaddedContainer(
              child: Text(
                'Account',
                style: TextStyle(
                  fontSize: subtitleTextSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(height: spacing_16),
            SettingsRow(
              text: 'Change Password',
              trailing: IconButton(
                icon: Icon(Icons.arrow_forward_ios),
                onPressed: () {},
              ),
            ),
            SettingsRow(
              text: 'Language',
              trailing: IconButton(
                icon: Icon(Icons.arrow_forward_ios),
                onPressed: () {},
              ),
            ),
            SizedBox(height: spacing_24),
            // Add more settings options here
            PaddedContainer(
              // title: Text(AppLocalizations.of(context)!.hello('Dongs')),
              child: PrimaryButton(onPressed: () {}, text: 'Apply'),
            ),
          ],
        ),
      ),
    );
  }
}

class SettingsRow extends StatelessWidget {
  final String text;
  final Widget trailing;

  const SettingsRow({required this.text, required this.trailing, super.key});

  @override
  Widget build(BuildContext context) {
    return PaddedContainer(
      color: secondaryBackgroundColor,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(text, style: TextStyle(fontSize: labelTextSize)),
          trailing,
        ],
      ),
    );
  }
}
