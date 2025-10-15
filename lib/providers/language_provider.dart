import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter/material.dart';

final languageProvider = StateProvider<Locale>((ref) => const Locale('en', ''));

class LanguageNotifier extends StateNotifier<Locale> {
  LanguageNotifier() : super(const Locale('en', '')) {
    _load();
  }
  Future<void> _load() async {
    // Load saved language from storage if needed
    // For simplicity, defaulting to English here
    state = const Locale('en', '');
  }

  Future<void> setLanguage(Locale locale) async {
    state = locale;
    // Save selected language to storage if needed
  }
}
