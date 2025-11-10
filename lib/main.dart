import 'package:http/http.dart' as http;
import 'dart:convert';

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
import 'package:flutter_application_1/providers/language_provider.dart';
import 'package:flutter_application_1/providers/theme_provider.dart';
import 'package:flutter_application_1/providers/fact_provider.dart';
import 'package:flutter_application_1/providers/speed_test_provider.dart';

import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:flutter_application_1/view_models/api_status_view_model.dart';
import 'package:flutter_application_1/view_models/deviceinfo_view_model.dart';
import 'package:flutter_application_1/models/api_status.dart';
import 'package:flutter_application_1/models/deviceinfo.dart';

//Global variables
String interfaceText = '';

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
  interfaceText = await _fetchInterface();
  runApp(ProviderScope(child: MyApp()));
}

class SubtitleLine {
  final String label;
  final String value;

  SubtitleLine(this.label, this.value);
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDarkMode = ref.watch(darkModeProvider);
    final language = ref.watch(languageProvider);
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
      // locale: const Locale('ja', ''),
      locale: language,
      title: 'Flutter Demo Home Page',
      theme: ThemeData(
        scaffoldBackgroundColor: primaryBackgroundColor,
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryColor,
          primary: primaryColor,
          secondary: secondaryBackgroundColor,
        ),
      ),
      darkTheme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Colors.black,
        // scaffoldBackgroundColor: primaryBackgroundColor,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blueGrey,
          primary: Colors.blueGrey,
          secondary: secondaryBackgroundColor,
          surface: Colors.blueGrey,
          // surface: Colors.grey.shade900,
          brightness: Brightness.dark,
        ),
      ),
      themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
      // themeMode: ThemeMode.system,
      home: LoginPage(),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends ConsumerStatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  ConsumerState<MyHomePage> createState() => _MyHomePageState();
}

Future<String> _fetchInterface() async {
  //fetching interface info from the api status view model
  //TODO: use riverpod to fetch this data instead of doing it here
  final response = await ApiStatusViewModel(http.Client()).fetchRouterStatus();
  print('response is: ${response.alias}');
  return response.alias;
}

class _MyHomePageState extends ConsumerState<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    String getFactOfTheDay(WidgetRef ref) {
      final factOfTheDay = ref.watch(factProvider);
      String factText = '';
      switch (factOfTheDay) {
        case AsyncData(:final value):
          factText = value.text;
        case AsyncLoading():
          factText = 'Loading fact of the day...';
        case AsyncError(:final error):
          factText = 'Error loading fact of the day: $error';
      }
      return factText;
    }

    String factText = getFactOfTheDay(ref);

    double downloadSpeed = 0;
    double uploadSpeed = 0;

    void getDownloadAndUploadSpeed(WidgetRef ref) {
      final speedTest = ref.watch(speedTestProvider);
      switch (speedTest) {
        case AsyncData(:final value):
          downloadSpeed = value.downloadSpeed;
          uploadSpeed = value.uploadSpeed;
        case AsyncLoading():
          downloadSpeed = 0;
          uploadSpeed = 0;
        case AsyncError():
          downloadSpeed = 0;
          uploadSpeed = 0;
      }
    }

    getDownloadAndUploadSpeed(ref);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
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
            title: 'Interface Summary',
            subtitles: [SubtitleLine('Interface', interfaceText)],
          ),
          SummaryCard(
            title: 'Did you know?',
            subtitles: [
              SubtitleLine(
                'Random Fact',
                // factOfTheDay.when(
                //   data: (fact) => fact.text,
                //   loading: () => 'Loading fact of the day...',
                //   error: (err, stack) => 'Error loading fact of the day',
                // ),
                factText,
              ),
            ],
            extraWidget: ElevatedButton(
              onPressed: () {
                ref.read(factProvider.notifier).fetchFact();
              },
              child: Text('Refresh Fact'),
            ),
          ),
          const VerticalSpacing(),
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
                value: downloadSpeed.toString(),
                // value: "120",
                unit: "Mbps",
                icon: Icons.download,
              ),
              _SpeedCard(
                label: "Upload",
                value: uploadSpeed.toString(),
                // value: "50",
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
  final List<SubtitleLine>?
  subtitles; // we use a list of the class subtitleLine to make it easier to add multiple lines
  final IconData? leadingIconData;
  final Color? leadingIconColor;
  final IconData? trailingIconData;
  final Color? trailingIconColor;
  final Widget? extraWidget;
  const SummaryCard({
    super.key,
    required this.title,
    this.subtitles,
    this.leadingIconData,
    this.leadingIconColor,
    this.trailingIconData,
    this.trailingIconColor,
    this.extraWidget,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: leadingIconData != null
                ? Icon(
                    leadingIconData,
                    color: leadingIconColor ?? Colors.purple,
                  )
                : null,
            title: Text(title),
            subtitle: Text(
              subtitles
                      ?.map((line) => '${line.label}: ${line.value}')
                      .join('\n') ??
                  '',
            ),
            trailing: trailingIconData != null
                ? Icon(
                    trailingIconData,
                    color: trailingIconColor ?? Colors.purple,
                  )
                : null,
          ),
          if (extraWidget != null) extraWidget!,
        ],
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
    final cardWidth =
        MediaQuery.of(context).size.width / 2 - 24; // 24 for spacing
    return Card(
      child: SizedBox(
        width: cardWidth,
        height: 150,
        child: Center(
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
      ),
      // child: Padding(
      //   padding: const EdgeInsets.all(48.0),
      //   child: Column(
      //     mainAxisSize: MainAxisSize.min,
      //     children: [
      //       Icon(icon, size: 32),
      //       const VerticalSpacing(height: spacing8),
      //       Text(
      //         '$value $unit',
      //         style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
      //       ),
      //       Text(label),
      //     ],
      //   ),
      // ),
    );
  }
}
