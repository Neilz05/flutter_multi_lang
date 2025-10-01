import 'package:flutter/material.dart';

import 'package:flutter_application_1/l10n/app_localizations.dart';

void navigateTo(BuildContext context, Widget page) {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => page),
  ); //push = keeps the previous page in the stack, meaning we can go back to it
}

void navigateAndReplace(BuildContext context, Widget page) {
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => page),
  ); //pushReplacement = replaces the current page, meaning we cannot go back to it
}

bool isMmobileLayout(BuildContext context) {
  final width = MediaQuery.of(context).size.width;
  return width < 600; // Example threshold for mobile layout
}

extension LocalizationHelper on BuildContext {
  /// Shortcut to access localized strings
  AppLocalizations get lang => AppLocalizations.of(this)!;
}
