import 'package:flutter/material.dart';
import 'main.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

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

  void _login() {
    String username = _usernameController.text;
    String password = _passwordController.text;
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
    if (username == realUsername &&
        hashedPassword == generateHashPassword(realPassword, salt)) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => MyHomePage(title: 'Flutter Demo Home Page'),
        ),
      );
    } else {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (message != null)
              Image.network(message!, width: 300, height: 300),
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 24),
            ElevatedButton(onPressed: _login, child: Text('Login')),
          ],
        ),
      ),
    );
  }
}
