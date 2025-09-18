import 'package:flutter/material.dart';
import 'package:flutter_application_1/constants.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Second Page')),
      body: Center(child: Text('This is the second page!')),
      bottomNavigationBar: BottomButton(
        text: 'Continue',
        onPressed: () {
          // Your action here
        },
      ),
    );
  }
}

class BottomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const BottomButton({super.key, required this.text, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    // return Row(
    //   mainAxisAlignment: MainAxisAlignment.center,
    //   children: [
    //     SizedBox(
    //       width: MediaQuery.of(context).size.width * 0.5,
    //       height: spacing_48,
    //       child: ElevatedButton(
    //         onPressed: onPressed,
    //         style: ElevatedButton.styleFrom(minimumSize: Size(20, spacing_48)),
    //         child: Text(text),
    //       ),
    //     ),
    //     SizedBox(height: 24),
    //   ],
    // );
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.5,
          height: spacing_48,
          child: ElevatedButton(
            // onPressed: onPressed,
            style: ElevatedButton.styleFrom(minimumSize: Size(0, spacing_48)),
            child: Text(text),
            onPressed: () async {
              // Create storage instance
              // final storage = FlutterSecureStorage();

              // Write value
              await storage.write(key: 'token', value: 'your_token');

              // Read value
              String? token = await storage.read(key: 'token');
              print('token: $token');
              // Delete value
              await storage.delete(key: 'token');
            },
          ),
        ),
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.5,
          height: spacing_48,
          child: ElevatedButton(
            // onPressed: onPressed,
            style: ElevatedButton.styleFrom(minimumSize: Size(0, spacing_48)),
            child: Text(text),
            onPressed: () {},
          ),
        ),
        SizedBox(height: 24), // This adds vertical space below the button
      ],
    );
  }
}
