import 'package:flutter/material.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/widgets/widgets.dart';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

bool isPasswordVisible = false;

Future<String?> registerUser(String email, String password) async {
  try {
    UserCredential userCredential = await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email, password: password);
    print("User registered: ${userCredential.user?.uid}");
    return userCredential.user?.uid;
  } on FirebaseAuthException catch (e) {
    if (e.code == 'weak-password') {
      print('The password provided is too weak.');
    }
    return null;
  }
}

Future<void> addUserToFirestore(
  String? uid,
  String username,
  String email,
  String userType,
) async {
  await FirebaseFirestore.instance.collection('users').doc(uid).set({
    'uid': uid,
    'username': username,
    'email': email,
    'userType': userType,
  });
}

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => RegisterPageState();
}

class RegisterPageState extends State<RegisterPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final usernameController = TextEditingController();

  String selectedUserType = 'user';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Register')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              TextField(
                controller: usernameController,
                decoration: InputDecoration(labelText: 'Username'),
              ),
              const VerticalSpacing(height: spacing16),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(
                  labelText: "Password",
                  suffixIcon: IconButton(
                    icon: isPasswordVisible
                        ? Icon(Icons.visibility_off)
                        : Icon(Icons.visibility),
                    onPressed: () {
                      setState(() {
                        isPasswordVisible = !isPasswordVisible;
                      });
                      // Toggle password visibility
                    },
                  ),
                ),
                obscureText: !isPasswordVisible,
              ),
              const VerticalSpacing(height: spacing16),
              TextField(
                controller: emailController,
                decoration: InputDecoration(labelText: 'Email'),
              ),
              const VerticalSpacing(height: spacing16),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: 'Select an option'),
                items: <DropdownMenuItem<String>>[
                  DropdownMenuItem(value: 'user', child: Text('User')),
                  DropdownMenuItem(value: 'admin', child: Text('Admin')),
                ],
                onChanged: (value) {
                  selectedUserType = value ?? 'user';
                },
              ),
              const VerticalSpacing(height: spacing16),
              PrimaryElevatedButton(
                text: "Register",
                onPressed: () async {
                  showAppSnackbar(context, "Registering user...");
                  String email = emailController.text;
                  String password = passwordController.text;
                  String username = usernameController.text;
                  String userType = selectedUserType;
                  String? uid = await registerUser(email, password);
                  if (uid != null) {
                    addUserToFirestore(uid, username, email, userType);
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
