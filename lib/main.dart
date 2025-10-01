import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/l10n/app_localizations.dart';
import 'package:flutter_application_1/login.dart';
import 'package:flutter_application_1/settings_page.dart';
import 'package:flutter_application_1/utils/utils.dart';

void main() {
  runApp(const MyApp());
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
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Colors.blueAccent,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        // title: Text(widget.title),
        // title: Text(AppLocalizations.of(context)!.helloWorld),
        // title: Text(context.lang.helloWorld),
        title: Text(context.lang.hello("Dongs")),
        // title: Text(AppLocalizations.of(context)!.hello('Dongs')),
        centerTitle: true,
      ),
      endDrawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            // const Drawer(
            //   child: DrawerHeader(
            //     decoration: BoxDecoration(color: Colors.blueAccent),
            //     child: Text('Menu'),
            //   ),
            // ),
            const UserAccountsDrawerHeader(
              accountName: Text("Admin"),
              // accountEmail: const SizedBox.shrink(),
              accountEmail: Text("sercomm.com"),
              currentAccountPicture: FlutterLogo(),
            ),
            // const DrawerHeader(
            // decoration: BoxDecoration(color: Colors.blueAccent),
            // child: Text('Menu'),
            // ),
            // SizedBox(
            //   // height: 100,
            //   child: Container(
            //     decoration: BoxDecoration(color: Colors.blueAccent),
            //     // margin: EdgeInsets.all(0.0),
            //     // padding: EdgeInsets.all(0.0),
            //     child: Center(child: Text('Headers')),
            //   ),
            // ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text(context.lang.settings),
              onTap: () {
                navigateTo(context, SettingsPage());
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text(context.lang.reset),
              onTap: () {
                setState(() {
                  _counter = 0;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text(context.lang.logout),
              onTap: () {
                navigateAndReplace(context, LoginPage());
              },
            ),
          ],
        ),
      ),
      // body: Center(
      //   child: Column(
      //     mainAxisAlignment: MainAxisAlignment.center,
      //     children: <Widget>[
      //       const Text('You have pushed the button this many times:'),
      //       Text(
      //         '$_counter',
      //         style: Theme.of(context).textTheme.headlineMedium,
      //       ),
      //       TextButton(
      //         onPressed: () {
      //           // Handle text button press
      //         },
      //         child: Text('Text Button'),
      //       ),
      //     ],
      //   ),
      // ),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: Column(
                mainAxisSize:
                    MainAxisSize.min, // Content wraps tightly and centers
                children: <Widget>[
                  Text(AppLocalizations.of(context)!.counterMessage),
                  // const Text('You have pushed the button this many times:'),
                  Text(
                    '$_counter',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ],
              ),
            ),
          ),
          // Padding(
          //   // padding: const EdgeInsets.all(40.0),
          //   padding: const EdgeInsets.only(
          //     top: 40.0,
          //     right: 40.0,
          //     bottom: 40.0,
          //     left: 20.0,
          //   ),
          //   child: Align(
          //     alignment: Alignment.bottomLeft,
          //     child: TextButton(
          //       style: TextButton.styleFrom(
          //         padding: const EdgeInsets.all(16.0),
          //         backgroundColor: Colors.red,
          //         foregroundColor: Colors.white,
          //         shape: RoundedRectangleBorder(
          //           borderRadius: BorderRadius.circular(8),
          //         ),
          //       ),
          //       onPressed: () {
          //         setState(() {
          //           _counter = 0;
          //         });
          //         // Handle text button press
          //       },
          //       child: Text('Reset count'),
          //     ),
          //   ),
          // ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            FloatingActionButton(
              heroTag: 'increment_btn',
              onPressed: _incrementCounter,
              tooltip: 'Increment',
              child: const Icon(Icons.add),
            ),
            FloatingActionButton(
              heroTag: 'decrement_btn',
              onPressed: () {
                setState(() {
                  _counter--;
                });
              },
              tooltip: 'Decrement',
              child: const Icon(Icons.remove),
            ),
          ],
        ),
      ),
      // floatingActionButton: FloatingActionButton(
      //   onPressed: _incrementCounter,
      //   tooltip: 'Increment',
      //   child: const Icon(Icons.add),
      // ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
