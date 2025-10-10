import 'package:flutter/material.dart';

import 'package:flutter_application_1/utils/utils.dart';
import 'package:flutter_application_1/admin_devices_overview.dart';

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

  @override
  Widget build(BuildContext context) {
    final deviceNameController = TextEditingController();
    final deviceOwnerController = TextEditingController();
    final deviceTypeController = TextEditingController();
    final deviceSerialNumberController = TextEditingController();
    String deviceStatusController = 'inactive';
    if (widget.deviceId == null) {
      return Scaffold(
        appBar: AppBar(title: Text('Admin Device Form')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: ListView(
            children: [
              TextFormField(
                controller: deviceNameController,
                decoration: InputDecoration(labelText: 'Device Name'),
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Device Status', style: TextStyle(fontSize: 16)),
                  OptionSwitch(
                    initialValue: false,
                    onChanged: (value) {
                      print('Device status changed: $value');
                      if (value) {
                        deviceStatusController = 'active';
                      } else {
                        deviceStatusController = 'inactive';
                      }
                      // Handle switch change
                    },
                  ),
                ],
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: deviceOwnerController,
                decoration: InputDecoration(labelText: 'Device Owner'),
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: deviceTypeController,
                decoration: InputDecoration(labelText: 'Device Type'),
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: deviceSerialNumberController,
                decoration: InputDecoration(labelText: 'Device Serial Number'),
              ),
              SizedBox(height: 32),
              PrimaryElevatedButton(
                text: 'Save Changes',
                onPressed: () async {
                  await FirebaseFirestore.instance
                      .collection('devices')
                      .add({
                        'deviceName': deviceNameController.text,
                        'deviceStatus': deviceStatusController,
                        'deviceOwner': deviceOwnerController.text,
                        'deviceType': deviceTypeController.text,
                        'deviceSerialNumber': deviceSerialNumberController.text,
                      });
                  if (mounted) {
                    showAppSnackbar(
                      this.context,
                      'New device added successfully',
                      backgroundColor: Colors.green,
                    );
                    navigateAndReplace(
                      this.context,
                      AdminDevicesOverviewPage(),
                    );
                  }
                },
              ),
            ],
          ),
        ),
      );
    } else {
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
              deviceNameController.text = device['deviceName'] ?? '';
              deviceOwnerController.text = device['deviceOwner'] ?? '';
              deviceTypeController.text = device['deviceType'] ?? '';
              deviceSerialNumberController.text =
                  device['deviceSerialNumber'] ?? '';
              return Padding(
                padding: const EdgeInsets.all(16.0),
                child: ListView(
                  children: [
                    TextFormField(
                      controller: deviceNameController,
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
                            print('Device status changed: $value');
                            if (value) {
                              deviceStatusController = 'active';
                            } else {
                              deviceStatusController = 'inactive';
                            }
                            // Handle switch change
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 16),
                    TextFormField(
                      controller: deviceOwnerController,
                      decoration: InputDecoration(labelText: 'Device Owner'),
                    ),
                    SizedBox(height: 16),
                    TextFormField(
                      controller: deviceTypeController,
                      decoration: InputDecoration(labelText: 'Device Type'),
                    ),
                    SizedBox(height: 16),
                    TextFormField(
                      controller: deviceSerialNumberController,
                      decoration: InputDecoration(
                        labelText: 'Device Serial Number',
                      ),
                    ),
                    SizedBox(height: 32),
                    PrimaryElevatedButton(
                      text: 'Save Changes',
                      onPressed: () async {
                        await FirebaseFirestore.instance
                            .collection('devices')
                            .doc(widget.deviceId)
                            .update({
                              'deviceName': deviceNameController.text,
                              'deviceStatus': deviceStatusController,
                              'deviceOwner': deviceOwnerController.text,
                              'deviceType': deviceTypeController.text,
                              'deviceSerialNumber':
                                  deviceSerialNumberController.text,
                            });
                        if (mounted) {
                          showAppSnackbar(
                            this.context,
                            'Device updated successfully',
                            backgroundColor: Colors.green,
                          );
                          navigateTo(this.context, AdminDevicesOverviewPage());
                        }
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
}
