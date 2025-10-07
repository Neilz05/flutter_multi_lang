import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/widgets/widgets.dart';

import 'package:firebase_auth/firebase_auth.dart';

bool _isPasswordVisible = false;

Future<String?> signIn(String email, String password) async {
  try {
    await FirebaseAuth.instance.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    return null; //return null if successful login
  } on FirebaseAuthException catch (e) {
    if (e.code == "invalid-credential") {
      return "Invalid credential";
    } else {
      return e.message;
    }
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

String generateHashPassword(String password, String salt) {
  var bytes = utf8.encode(password + salt); // data being hashed
  var digest = sha256.convert(bytes);
  return digest.toString();
}

String encryptJson(String jsonString, String keyString) {
  final key = encrypt.Key.fromUtf8(keyString);
  final iv = encrypt.IV.fromLength(16); // Initialization vector

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final encrypted = encrypter.encrypt(jsonString, iv: iv);
  final encryptedMap = {'iv': iv.base64, 'ciphertext': encrypted.base64};
  return jsonEncode(encryptedMap);
}

String decryptJson(String encryptedJson, String keyString) {
  final key = encrypt.Key.fromUtf8(keyString);

  final Map<String, dynamic> encryptedMap = jsonDecode(encryptedJson);
  final iv = encrypt.IV.fromBase64(encryptedMap['iv']);
  final ciphertext = encryptedMap['ciphertext'];

  final encrypter = encrypt.Encrypter(encrypt.AES(key));
  final decrypted = encrypter.decrypt64(ciphertext, iv: iv);

  return decrypted;
}

class _LoginPageState extends State<LoginPage> {
  String? message;
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  @override
  void initState() {
    super.initState();
    _isPasswordVisible = false;
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      final response = await http.get(
        Uri.parse('https://dog.ceo/api/breeds/image/random'),
      );
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body); // data is now a Dart Map or List
        // Use 'data' as needed
        setState(() {
          message = data['message'];
        });
      }
    } catch (e) {}
  }

  void _login() async {
    String username = _usernameController.text;
    String password = _passwordController.text;

    String? error = await signIn(username, password);
    //using firebase auth for login
    if (error == null) {
      navigateAndReplace(context, MyHomePage(title: 'Flutter Demo Home Page'));
      return;
    } else {
      // navigateAndReplace(context, MyHomePage(title: 'Flutter Demo Home Page'));
      // return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Login failed: Please try again',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          // backgroundColor: Colors.redAccent,
          behavior: SnackBarBehavior.floating, // or SnackBarBehavior.fixed
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          duration: Duration(seconds: 3),
          action: SnackBarAction(
            label: 'Dismiss',
            textColor: Colors.white,
            onPressed: () {},
          ),
        ),
      );
    }
    /*
    String salt = "SERCOMMSALT"; // assumed to be from backend
    String keyString =
        'my32lengthsupersecretnooneknows1'; // 32 chars for AES-256, should be from backend
    // generate sha256 hash of the password
    var hashedPassword = generateHashPassword(password, salt);
    // Add your login logic here

    Map<String, String> userInfo = {
      'username': username,
      'password': hashedPassword,
    };
    String jsonString = jsonEncode(userInfo);

    String encryptedJson = encryptJson(jsonString, keyString);
    String decryptedJson = decryptJson(
      encryptedJson,
      keyString,
    ); // just for test
    Map<String, dynamic> userMap = jsonDecode(decryptedJson);
    String realPassword = '12345'; // assumed to be from backend
    String realUsername = 'user'; // assumed to be from backend
    if (userMap['username'] == realUsername &&
        userMap['password'] == generateHashPassword(realPassword, salt)) {
      navigateAndReplace(context, MyHomePage(title: 'Flutter Demo Home Page'));
    } else {
      navigateAndReplace(
        context,
        MyHomePage(title: 'Flutter Demo Home Page'),
      ); // Temporary bypass for testing
      // Show an error message or handle login failure
      // ScaffoldMessenger.of(
      //   context,
      // ).showSnackBar(SnackBar(content: Text('Login failed')));
    }
    */
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        bool isMobile = isMmobileLayout(context);
        return isMobile
            ? buildMobileLayout(context)
            : buildDesktopLayout(context);
      },
    );
  }

  Widget buildMobileLayout(BuildContext context) {
    return Scaffold(
      // body: Center(
      body: Padding(
        // child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: SingleChildScrollView(
          child: Column(
            // mainAxisAlignment: MainAxisAlignment.center,
            children: [
              VerticalSpacing(height: spacing48),
              FadingImage(imagePath: 'assets/images/sercomm_logo.png'),
              TextField(
                textCapitalization: TextCapitalization.none,
                controller: _usernameController,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.person),
                  labelText: context.lang.username,
                ),
              ),
              const VerticalSpacing(height: spacing16),
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.lock),
                  labelText: context.lang.password,
                  suffixIcon: IconButton(
                    icon: _isPasswordVisible
                        ? Icon(Icons.visibility_off)
                        : Icon(Icons.visibility),
                    onPressed: () {
                      setState(() {
                        _isPasswordVisible = !_isPasswordVisible;
                      });
                      // Toggle password visibility
                    },
                  ),
                ),
                obscureText: !_isPasswordVisible,
              ),
              const VerticalSpacing(height: spacing48),
              PrimaryButton(onPressed: _login, text: context.lang.login),
            ],
          ),
        ),
      ),
    );
  }

  Widget buildDesktopLayout(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(title: Text(context.lang.login)),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // if (message != null)
                // Image.network(message!, width: 300, height: 300),
                Image.asset(
                  'assets/images/sercomm_logo.png',
                  width: 250,
                  height: 250,
                ),
                ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: 400),
                  child: TextField(
                    controller: _usernameController,
                    decoration: InputDecoration(
                      labelText: context.lang.username,
                    ),
                  ),
                ),
                const VerticalSpacing(height: spacing16),
                ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: 400),
                  child: TextField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: context.lang.password,
                    ),
                    obscureText: true,
                  ),
                ),
                const VerticalSpacing(height: spacing48),
                SizedBox(
                  width: 400,
                  child: ElevatedButton(
                    onPressed: _login,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: primaryColor,
                      foregroundColor: Theme.of(context).secondaryHeaderColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                    ),
                    child: Text(context.lang.login),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class FadingImage extends StatefulWidget {
  final String imagePath;
  const FadingImage({required this.imagePath, Key? key}) : super(key: key);

  @override
  State<FadingImage> createState() => _FadingImageState();
}

class _FadingImageState extends State<FadingImage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
    _animation = Tween<double>(begin: 0.3, end: 1.0).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Image.asset(widget.imagePath, width: 250, height: 250),
        );
      },
    );
  }
}
