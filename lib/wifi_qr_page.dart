import 'package:flutter/material.dart';

import 'package:mobile_scanner/mobile_scanner.dart';

class WifiQrPage extends StatelessWidget {
  const WifiQrPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('WiFi QR Code')),
      body: Center(
        child: SizedBox(
          height: 500,
          width: 300,
          child: MobileScanner(
            onDetect: (result) {
              print(result.barcodes.first.rawValue);
            },
          ),
        ),
      ),
    );
  }
}
