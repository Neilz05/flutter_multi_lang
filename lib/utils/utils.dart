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

void showAppSnackbar(
  BuildContext context,
  String message, {
  Color? backgroundColor,
}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(
        message,
        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      ),
      // backgroundColor: Colors.redAccent,
      behavior: SnackBarBehavior.floating, // or SnackBarBehavior.fixed
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      duration: Duration(seconds: 3),
      action: SnackBarAction(
        label: 'Dismiss',
        textColor: Colors.white,
        onPressed: () {},
      ),
    ),
  );
}

bool isMmobileLayout(BuildContext context) {
  final width = MediaQuery.of(context).size.width;
  return width < 1200; // Example threshold for mobile layout
}

extension LocalizationHelper on BuildContext {
  /// Shortcut to access localized strings
  AppLocalizations get lang => AppLocalizations.of(this)!;
}
