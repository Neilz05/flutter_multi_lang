import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
// import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/l10n/app_localizations.dart';
import 'package:flutter_application_1/login.dart';
import 'package:flutter_application_1/settings_page.dart';
import 'package:flutter_application_1/wifi_welcome_page.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/wifi_speed_test.dart';
import 'package:flutter_application_1/wifi_qr_page.dart';
import 'package:flutter_application_1/admin_devices_overview.dart';
import 'package:flutter_application_1/admin_users_overview.dart';

import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<bool> isAdminUser() async {
  final uid = FirebaseAuth.instance.currentUser?.uid;
  bool isAdmin = false;
  final doc = await FirebaseFirestore.instance
      .collection('users')
      .doc(uid)
      .get();
  if (doc.exists && doc.data()?['userType'] == 'admin') {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
  return isAdmin;
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(MyApp());
}

class SubtitleLine {
  final String label;
  final String value;

  SubtitleLine(this.label, this.value);
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      //localication
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en', ''), // English
        Locale('es', ''), // Spanish
        Locale('ja', ''), // Japanese
      ],
      locale: const Locale('ja', ''),
      title: 'Flutter Demo Home Page',
      theme: ThemeData(
        scaffoldBackgroundColor: primaryBackgroundColor,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
      ),
      home: LoginPage(),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text(context.lang.hello("Dongs")),
        centerTitle: true,
      ),
      endDrawer: Drawer(
        child: ListView(
          children: [
            const UserAccountsDrawerHeader(
              accountName: Text("Admin"),
              accountEmail: Text("sercomm.com"),
              currentAccountPicture: FlutterLogo(),
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text(context.lang.settings),
              onTap: () {
                navigateTo(context, SettingsPage());
              },
            ),
            ListTile(
              leading: Icon(Icons.wifi),
              title: Text("Wifi Page"),
              onTap: () {
                navigateTo(context, WifiWelcomePage());
              },
            ),
            FutureBuilder(
              future: isAdminUser(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return ListTile(
                    leading: Icon(Icons.admin_panel_settings),
                    title: Text("Checking Admin..."),
                    onTap: () {},
                  );
                } else if (snapshot.hasError) {
                  return ListTile(
                    leading: Icon(Icons.error),
                    title: Text("Error checking admin"),
                    onTap: () {},
                  );
                } else if (snapshot.hasData && snapshot.data == true) {
                  return Column(
                    children: [
                      ListTile(
                        leading: Icon(Icons.admin_panel_settings),
                        title: Text("Admin - Users Overview"),
                        onTap: () {
                          navigateTo(context, AdminUsersOverview());
                        },
                      ),
                      ListTile(
                        leading: Icon(Icons.admin_panel_settings),
                        title: Text("Admin - Devices Overview"),
                        onTap: () {
                          navigateTo(context, AdminDevicesOverviewPage());
                        },
                      ),
                    ],
                  );
                } else {
                  return SizedBox.shrink(); // Return an empty widget if not admin
                }
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text(context.lang.logout),
              onTap: () async {
                await FirebaseAuth.instance.signOut();
                if (!context.mounted) return; // Safe check
                navigateAndReplace(context, const LoginPage());
              },
            ),
          ],
        ),
      ),

      //body simulating a wifi dashboard page, all data are hardcoded for now
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          SummaryCard(
            leadingIconData: Icons.wifi,
            leadingIconColor: Colors.blue,
            title: 'Connected: MyWiFiNetwork',
            subtitles: [SubtitleLine('Signal Strength', 'Excellent')],
            trailingIconData: Icons.check_circle,
            trailingIconColor: Colors.green,
          ),
          const VerticalSpacing(),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _SpeedCard(
                label: "Download",
                value: "120",
                unit: "Mbps",
                icon: Icons.download,
              ),
              _SpeedCard(
                label: "Upload",
                value: "50",
                unit: "Mbps",
                icon: Icons.upload,
              ),
            ],
          ),
          const VerticalSpacing(),
          SummaryCard(
            leadingIconData: Icons.data_usage,
            leadingIconColor: Colors.orange,
            title: 'Data Usage',
            subtitles: [SubtitleLine('Today', '1.2 GB')],
          ),
          const VerticalSpacing(),
          SummaryCard(
            leadingIconData: Icons.security,
            leadingIconColor: Colors.teal,
            title: 'Security',
            subtitles: [SubtitleLine('WPA2', 'Secure')],
          ),
          const VerticalSpacing(),
          SummaryCard(
            leadingIconData: Icons.devices,
            leadingIconColor: Colors.purple,
            title: "Device Info",
            subtitles: [
              SubtitleLine('SSID', 'MyWiFiNetwork'),
              SubtitleLine('IP', '192.168.1.2'),
            ],
          ),
          const VerticalSpacing(),
          PrimaryElevatedButton(
            text: 'Run Speed Test',
            icon: Icons.speed,
            onPressed: () {
              navigateTo(context, WifiSpeedTest());
            },
          ),
          const VerticalSpacing(height: spacing8),
          PrimaryElevatedButton(
            text: 'Scan WiFi QR',
            icon: Icons.qr_code_scanner,
            onPressed: () {
              navigateTo(context, WifiQrPage());
            },
          ),
        ],
      ),
    );
  }
}

class SummaryCard extends StatelessWidget {
  final String title;
  final List<SubtitleLine>
  subtitles; // we use a list of the class subtitleLine to make it easier to add multiple lines
  final IconData? leadingIconData;
  final Color? leadingIconColor;
  final IconData? trailingIconData;
  final Color? trailingIconColor;

  const SummaryCard({
    super.key,
    required this.title,
    required this.subtitles,
    this.leadingIconData,
    this.leadingIconColor,
    this.trailingIconData,
    this.trailingIconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: leadingIconData != null
            ? Icon(leadingIconData, color: leadingIconColor ?? Colors.purple)
            : null,
        title: Text(title),
        subtitle: Text(
          subtitles.map((line) => '${line.label}: ${line.value}').join('\n'),
        ),
        trailing: trailingIconData != null
            ? Icon(trailingIconData, color: trailingIconColor ?? Colors.purple)
            : null,
      ),
    );
  }
}

class _SpeedCard extends StatelessWidget {
  final String label;
  final String value;
  final String unit;
  final IconData icon;

  const _SpeedCard({
    required this.label,
    required this.value,
    required this.unit,
    required this.icon,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(48.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 32),
            const VerticalSpacing(height: spacing8),
            Text(
              '$value $unit',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Text(label),
          ],
        ),
      ),
    );
  }
}
