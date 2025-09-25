// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get helloWorld => 'Hello World!';

  @override
  String hello(String userName) {
    return 'Hello $userName';
  }

  @override
  String get username => 'Username';

  @override
  String get password => 'Password';

  @override
  String get login => 'Login';

  @override
  String get counterMessage => 'You have pushed the button this many times:';

  @override
  String get apply => 'Apply';

  @override
  String get reset => 'Reset';

  @override
  String get logout => 'Logout';

  @override
  String get settings => 'Settings';

  @override
  String get settingsEnableFeatureX => 'Enable Feature X';

  @override
  String get settingsEnableFeatureY => 'Enable Feature Y';

  @override
  String get settingsChangePassword => 'Change Password';

  @override
  String get settingsLanguage => 'Language';

  @override
  String get settingsAccount => 'Account';
}
