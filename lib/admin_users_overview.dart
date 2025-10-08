import 'package:flutter/material.dart';

import 'package:flutter_application_1/constants.dart';
import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<String?> createUser(String email, String password) async {
  try {
    UserCredential userCredential = await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email, password: password);
    return userCredential.user?.uid;
  } on FirebaseAuthException catch (e) {
    return null;
  }
}

Future<List<Map<String, dynamic>>> fetchUsers() async {
  QuerySnapshot snapshot = await FirebaseFirestore.instance
      .collection('users')
      .get();
  List<User> users = snapshot.docs
      .map((doc) => User.fromMap(doc.data() as Map<String, dynamic>))
      .toList();
  return users
      .map(
        (user) => {
          // 'id': user.id,
          'uid': user.uid,
          'username': user.username,
          'email': user.email,
          'userType': user.userType,
        },
      )
      .toList();
}

class User {
  final String uid;
  final String username;
  final String email;
  final String userType;

  User({
    required this.uid,
    required this.username,
    required this.email,
    required this.userType,
  });

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      uid: map['uid'] ?? '',
      username: map['username'] ?? '',
      email: map['email'] ?? '',
      userType: map['userType'] ?? '',
    );
  }
}

class AdminUsersOverview extends StatelessWidget {
  const AdminUsersOverview({super.key});

  @override
  Widget build(BuildContext context) {
    void editUser(String docId, Map<String, dynamic> user) {
      final usernameController = TextEditingController(text: user['username']);
      final emailController = TextEditingController(text: user['email']);

      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Edit User'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: usernameController,
                decoration: InputDecoration(labelText: 'Username'),
              ),
              TextField(
                controller: emailController,
                decoration: InputDecoration(labelText: 'Email'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                await FirebaseFirestore.instance
                    .collection('users')
                    .doc(docId)
                    .update({
                      'username': usernameController.text,
                      'email': emailController.text,
                    });
                Navigator.pop(context);
              },
              child: Text('Save'),
            ),
          ],
        ),
      );
    }

    void addUser() {
      final usernameController = TextEditingController();
      final emailController = TextEditingController();
      final passwordController = TextEditingController();
      String userType = 'user';

      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Add User'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: usernameController,
                  decoration: InputDecoration(labelText: 'Username'),
                ),
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(labelText: 'Email'),
                ),
                TextField(
                  controller: passwordController,
                  decoration: InputDecoration(labelText: 'Password'),
                ),
                DropdownButton(
                  value: userType,
                  items: [
                    DropdownMenuItem(value: 'admin', child: Text('Admin')),
                    DropdownMenuItem(value: 'user', child: Text('User')),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      userType = value;
                    }
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                String? uid = await createUser(
                  emailController.text,
                  passwordController.text,
                );
                if (uid == null) {
                  // Handle user creation error
                  return;
                }
                await FirebaseFirestore.instance
                    .collection('users')
                    .doc(uid)
                    .set({
                      'username': usernameController.text,
                      'email': emailController.text,
                      'userType': userType,
                    });
                Navigator.pop(context);
              },
              child: Text('Add'),
            ),
          ],
        ),
      );
    }

    void deleteUser(String docId, String? username) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Delete User'),
          content: RichText(
            text: TextSpan(
              style: TextStyle(color: Colors.black),
              children: [
                TextSpan(text: 'Are you sure you want to delete user '),
                TextSpan(
                  text: username,
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                TextSpan(text: '?'),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                await FirebaseFirestore.instance
                    .collection('users')
                    .doc(docId)
                    .delete();
                Navigator.pop(context);
              },
              child: Text('Delete'),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Admin - Users Overview')),
      body: Padding(
        padding: const EdgeInsets.all(spacing16),
        child: StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance.collection('users').snapshots(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData) {
              final docs = snapshot.data!.docs;
              return ListView.builder(
                itemCount: docs.length,
                itemBuilder: (context, index) {
                  final user = docs[index].data() as Map<String, dynamic>;
                  final docId = docs[index].id;
                  return Card(
                    child: ListTile(
                      title: Text(
                        'Username: ${user['username'] ?? 'No Username'}',
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: Icon(Icons.edit),
                            onPressed: () => editUser(docId, user),
                          ),

                          IconButton(
                            color: Colors.red,
                            icon: Icon(Icons.delete_outline),
                            onPressed: () =>
                                deleteUser(docId, user['username']),
                            // onPressed: () => editUser(docId, user),
                          ),
                        ],
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Email: ${user['email'] ?? 'No Email'}'),
                          Text('Role: ${user['userType'] ?? 'No Role'}'),
                        ],
                      ),
                    ),
                  );
                },
              );
            }
            return SizedBox.shrink();
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: addUser,
        tooltip: 'Add User',
        child: Icon(Icons.add),
      ),
    );
  }
}
