import 'package:flutter/material.dart';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_application_1/utils/utils.dart';

import 'package:flutter_application_1/admin_device_form.dart';

Future<List<Map<String, dynamic>>> fetchDevices() async {
  QuerySnapshot snapshot = await FirebaseFirestore.instance
      .collection('devices')
      .get();
  List<Device> devices = snapshot.docs
      .map((doc) => Device.fromMap(doc.data() as Map<String, dynamic>))
      .toList();
  return devices
      .map(
        (device) => {
          'deviceName': device.deviceName,
          'deviceStatus': device.deviceStatus,
          'deviceOwner': device.deviceOwner,
          'deviceType': device.deviceType,
          'deviceSerialNumber': device.deviceSerialNumber,
        },
      )
      .toList();
}

class Device {
  // final String id;
  final String deviceName;
  final String deviceStatus;
  final String deviceOwner;
  final String deviceType;
  final String deviceSerialNumber;

  Device({
    // required this.id,
    required this.deviceName,
    required this.deviceStatus,
    required this.deviceOwner,
    required this.deviceType,
    required this.deviceSerialNumber,
  });

  factory Device.fromMap(Map<String, dynamic> map) {
    return Device(
      // id: map['id'] ?? '',
      deviceName: map['deviceName'] ?? '',
      deviceStatus: map['deviceStatus'] ?? '',
      deviceOwner: map['deviceOwner'] ?? '',
      deviceType: map['deviceType'] ?? '',
      deviceSerialNumber: map['deviceSerialNumber'] ?? '',
    );
  }
}

class AdminDevicesOverviewPage extends StatelessWidget {
  const AdminDevicesOverviewPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin Devices Overview')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance.collection('devices').snapshots(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
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
                      title: Text('${user['deviceName'] ?? 'No deviceName'}'),
                      onTap: () => {
                        navigateTo(
                          context,
                          AdminDeviceFormPage(deviceId: docId),
                        ),
                        // Navigate to device details page or perform any action
                      },
                      trailing: Icon(Icons.arrow_forward_ios),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Owner: ${user['deviceOwner'] ?? 'No deviceOwner'}',
                          ),
                          Text(
                            'Device Type: ${user['deviceType'] ?? 'No deviceType'}',
                          ),
                          Text(
                            'Device SN: ${user['deviceSerialNumber'] ?? 'No deviceSerialNumber'}',
                          ),
                          Text(
                            'Status: ${user['deviceStatus'] ?? 'No deviceStatus'}',
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            } else {
              return Center(child: CircularProgressIndicator());
            }
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Action to add a new device
          navigateTo(context, AdminDeviceFormPage());
        },
        tooltip: 'Add Device',
        child: Icon(Icons.add),
      ),
    );
  }
}
