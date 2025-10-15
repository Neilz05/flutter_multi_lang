// import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// final darkModeProvider = StateProvider<bool>((ref) => false);
final darkModeProvider = StateNotifierProvider<DarkModeNotifier, bool>(
  (ref) => DarkModeNotifier(),
);
final storage = FlutterSecureStorage();

class DarkModeNotifier extends StateNotifier<bool> {
  DarkModeNotifier() : super(false) {
    //super means initial value
    _load();
  }
  Future<void> _load() async {
    final value = await storage.read(key: 'darkMode');
    state = value == 'true';
  }

  Future<void> setDarkMode(bool value) async {
    state = value;
    await storage.write(key: 'darkMode', value: value.toString());
  }
}
