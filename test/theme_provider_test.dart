import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_application_1/providers/theme_provider.dart';

void main() {
  test('darkModeProvider initial value is false', () {
    final container = ProviderContainer();
    expect(container.read(darkModeProvider), false);
  });
  test('darkModeProvider can be set to true', () {
    final container = ProviderContainer();
    container.read(darkModeProvider.notifier).state = true;
    expect(container.read(darkModeProvider), true);
  });
}
