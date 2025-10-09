import 'package:flutter/material.dart';

import 'package:flutter_application_1/utils/utils.dart';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_application_1/widgets/widgets.dart';

class AdminDeviceFormPage extends StatefulWidget {
  final String? deviceId;
  const AdminDeviceFormPage({super.key, this.deviceId});

  @override
  State<AdminDeviceFormPage> createState() => _AdminDeviceFormPageState();
}

class _AdminDeviceFormPageState extends State<AdminDeviceFormPage> {
  @override
  void initState() {
    super.initState();
    if (widget.deviceId != null) {
      // Fetch device details using widget.deviceId
    }
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin Device Form')),
      body: StreamBuilder<DocumentSnapshot>(
        stream: FirebaseFirestore.instance
            .collection('devices')
            .doc(widget.deviceId)
            .snapshots(),
        builder: (context, snapshot) {
          // return Center(child: Text('Device ID: ${widget.deviceId}'));
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final device = snapshot.data?.data() as Map<String, dynamic>;
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: ListView(
                children: [
                  TextFormField(
                    initialValue: device['deviceName'] ?? '',
                    decoration: InputDecoration(labelText: 'Device Name'),
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Device Status', style: TextStyle(fontSize: 16)),
                      OptionSwitch(
                        initialValue: device['deviceStatus'] == 'active',
                        onChanged: (value) {
                          // Handle switch change
                        },
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    initialValue: device['deviceOwner'] ?? '',
                    decoration: InputDecoration(labelText: 'Device Owner'),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    initialValue: device['deviceType'] ?? '',
                    decoration: InputDecoration(labelText: 'Device Type'),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    initialValue: device['deviceSerialNumber'] ?? '',
                    decoration: InputDecoration(
                      labelText: 'Device Serial Number',
                    ),
                  ),
                  SizedBox(height: 32),
                  PrimaryElevatedButton(
                    text: 'Save Changes',
                    onPressed: () {
                      // Save changes to Firestore
                    },
                  ),
                ],
              ),
            );
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}
