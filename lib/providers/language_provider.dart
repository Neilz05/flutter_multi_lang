import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// final languageProvider = StateProvider<Locale>((ref) => const Locale('en', ''));

final languageProvider = StateNotifierProvider<LanguageNotifier, Locale>(
  (ref) => LanguageNotifier(),
);
final storage = FlutterSecureStorage();

class LanguageNotifier extends StateNotifier<Locale> {
  LanguageNotifier() : super(Locale('en', '')) {
    _load();
  }
  Future<void> _load() async {
    final value = await storage.read(key: 'language');
    // For simplicity, defaulting to English here

    state = value != null ? Locale(value, '') : const Locale('en', '');
  }

  Future<void> setLanguage(Locale locale) async {
    state = locale;
    await storage.write(key: 'language', value: locale.toString());
  }
}
