import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/widgets/widgets.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_application_1/providers/theme_provider.dart';

final storage = FlutterSecureStorage();

class SettingsPage extends ConsumerWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDarkMode = ref.watch(darkModeProvider);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text(context.lang.settings),
      ),
      body: PaddedContainer(
        padding: EdgeInsets.symmetric(horizontal: 0),
        child: ListView(
          children: [
            SizedBox(height: spacing16),
            PaddedContainer(
              child: Text(
                context.lang.settings,
                style: TextStyle(
                  fontSize: subtitleTextSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(height: spacing16),
            SettingsRow(
              text: context.lang.settingsEnableFeatureX,
              trailing: OptionSwitch(initialValue: true, onChanged: (val) {}),
            ),
            SettingsRow(
              text: context.lang.settingsEnableFeatureY,
              trailing: OptionSwitch(initialValue: false, onChanged: (val) {}),
            ),
            SettingsRow(
              text: 'Dark Mode',
              trailing: OptionSwitch(
                initialValue: isDarkMode,
                onChanged: (val) {
                  ref.read(darkModeProvider.notifier).state = val;
                },
              ),
            ),
            SizedBox(height: spacing16), // Add some spacing
            PaddedContainer(
              child: Text(
                context.lang.settingsAccount,
                style: TextStyle(
                  fontSize: subtitleTextSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(height: spacing16),
            ClickableSettingsRow(
              text: context.lang.settingsChangePassword,
              onPressed: () {},
            ),
            ClickableSettingsRow(
              text: context.lang.settingsLanguage,
              onPressed: () {},
            ),
            SizedBox(height: spacing24),
            // Add more settings options here
            PaddedContainer(
              child: PrimaryButton(onPressed: () {}, text: context.lang.apply),
            ),
          ],
        ),
      ),
    );
  }
}

class ClickableSettingsRow extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;

  const ClickableSettingsRow({super.key, required this.text, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        child: SettingsRow(
          clickable: true,
          text: text,
          trailing: IconButton(
            icon: Icon(Icons.arrow_forward_ios),
            onPressed: onPressed,
          ),
        ),
      ),
    );
  }
}

class SettingsRow extends StatelessWidget {
  final String text;
  final Widget trailing;
  final bool clickable;

  const SettingsRow({
    required this.text,
    required this.trailing,
    this.clickable = false,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return PaddedContainer(
      color: Colors.transparent,
      // color: clickable ? Colors.transparent : secondaryBackgroundColor,
      // color: clickable
      //     ? Colors.transparent
      //     : Theme.of(context).colorScheme.surface,
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
