import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_application_1/providers/fact_provider.dart';
import 'package:flutter_application_1/models/fact.dart';

void main() {
  test('factProvider returns a fact', () async {
    final container = ProviderContainer();
    // final fact = await container.read(factProvider.future);

    // print(fact.text);
    // print(fact.punchline);

    // Verify that we received a fact object with non-empty fields
    // expect(fact, isA<Fact>());
    // expect(fact.text, isNotEmpty);
  });
}
