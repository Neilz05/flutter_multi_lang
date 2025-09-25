// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get helloWorld => 'Hello World!';

  @override
  String hello(String userName) {
    return 'こんにちは $userName';
  }

  @override
  String get username => 'ユーザー名';

  @override
  String get password => 'パスワード';

  @override
  String get login => 'ログイン';

  @override
  String get counterMessage => 'ボタンを何回押しましたか:';

  @override
  String get apply => '適用';

  @override
  String get reset => 'リセット';

  @override
  String get logout => 'ログアウト';

  @override
  String get settings => '設定';

  @override
  String get settingsEnableFeatureX => '機能Xを有効にする';

  @override
  String get settingsEnableFeatureY => '機能Yを有効にする';

  @override
  String get settingsChangePassword => 'パスワードを変更';

  @override
  String get settingsLanguage => '言語';

  @override
  String get settingsAccount => 'アカウント';
}
