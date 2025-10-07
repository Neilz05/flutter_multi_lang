import "package:flutter/material.dart";

class AdminUsersOverview extends StatelessWidget {
  const AdminUsersOverview({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin - Users Overview')),
      body: Center(child: Text('List of all users will be displayed here.')),
    );
  }

  //TODO: Implement the actual user overview functionality
}
