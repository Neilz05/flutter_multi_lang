import 'package:flutter/material.dart';

import 'package:flutter_application_1/utils/utils.dart';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:flutter_application_1/utils/checker.dart';

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

  final deviceNameController = TextEditingController();
  final deviceOwnerController = TextEditingController();
  final deviceTypeController = TextEditingController();
  final deviceSerialNumberController = TextEditingController();
  String deviceStatusController = 'inactive';
  final formKey = GlobalKey<FormState>();

  void onStatusChanged(bool value) {
    setState(() {
      deviceStatusController = value ? 'active' : 'inactive';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.deviceId == null) {
      return Scaffold(
        appBar: AppBar(title: Text('Admin Device Form')),
        body: BuildDeviceForm(
          formKey: formKey,
          deviceNameController: deviceNameController,
          deviceOwnerController: deviceOwnerController,
          deviceTypeController: deviceTypeController,
          deviceSerialNumberController: deviceSerialNumberController,
          deviceStatusController: deviceStatusController,
          onStatusChanged: (value) {
            onStatusChanged(value);
          },
          mounted: mounted,
          context: context,
          deviceId: widget.deviceId,
        ),
      );
    } else {
      return Scaffold(
        appBar: AppBar(
          title: Text('Admin Device Form'),
          actions: [
            IconButton(
              icon: Icon(Icons.delete),
              color: Colors.red,
              onPressed: () async {
                final confirmed = await showDeleteConfirmationDialog(
                  context,
                  itemName: deviceNameController.text,
                );
                if (confirmed) {
                  //we delete the device
                  FirebaseFirestore.instance
                      .collection('devices')
                      .doc(widget.deviceId)
                      .delete();
                  if (mounted) {
                    showAppSnackbar(
                      this.context,
                      'Device deleted successfully',
                      backgroundColor: Colors.green,
                    );
                    navigateBack(this.context);
                  }
                }
              },
            ),
          ],
        ),
        body: StreamBuilder<DocumentSnapshot>(
          stream: FirebaseFirestore.instance
              .collection('devices')
              .doc(widget.deviceId)
              .snapshots(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData && snapshot.data!.exists) {
              final device = snapshot.data?.data() as Map<String, dynamic>;
              deviceNameController.text = device['deviceName'] ?? '';
              deviceOwnerController.text = device['deviceOwner'] ?? '';
              deviceTypeController.text = device['deviceType'] ?? '';
              deviceSerialNumberController.text =
                  device['deviceSerialNumber'] ?? '';
              deviceStatusController = device['deviceStatus'] ?? 'active';
              return BuildDeviceForm(
                formKey: formKey,
                deviceNameController: deviceNameController,
                deviceOwnerController: deviceOwnerController,
                deviceTypeController: deviceTypeController,
                deviceSerialNumberController: deviceSerialNumberController,
                deviceStatusController: deviceStatusController,
                onStatusChanged: (value) {
                  onStatusChanged(value);
                },
                mounted: mounted,
                context: context,
                deviceId: widget.deviceId,
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

class BuildDeviceForm extends StatefulWidget {
  const BuildDeviceForm({
    super.key,
    required this.formKey,
    required this.deviceNameController,
    required this.deviceOwnerController,
    required this.deviceTypeController,
    required this.deviceSerialNumberController,
    required this.deviceStatusController,
    required this.onStatusChanged,
    required this.mounted,
    required this.context,
    required this.deviceId,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController deviceNameController;
  final TextEditingController deviceOwnerController;
  final TextEditingController deviceTypeController;
  final TextEditingController deviceSerialNumberController;
  final String deviceStatusController;
  final Function(bool) onStatusChanged;
  final bool mounted;
  final BuildContext context;
  final String? deviceId;

  @override
  State<BuildDeviceForm> createState() => _BuildDeviceFormState();
}

class _BuildDeviceFormState extends State<BuildDeviceForm> {
  late String deviceStatusController;

  @override
  void initState() {
    super.initState();
    deviceStatusController = widget.deviceStatusController;
  }

  void handleStatusChanged(bool value) {
    setState(() {
      deviceStatusController = value ? 'active' : 'inactive';
    });
    widget.onStatusChanged(value);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: widget.formKey,
        child: ListView(
          children: [
            TextFormField(
              controller: widget.deviceNameController,
              decoration: InputDecoration(labelText: 'Device Name'),
              validator: (value) =>
                  requiredFieldValidator(value, fieldName: 'Device Name'),
            ),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Device Status', style: TextStyle(fontSize: 16)),
                OptionSwitch(
                  initialValue: widget.deviceStatusController == 'active',
                  onChanged: handleStatusChanged,

                  // onChanged: onStatusChanged,
                ),
              ],
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: widget.deviceOwnerController,
              decoration: InputDecoration(labelText: 'Device Owner'),
              validator: (value) =>
                  requiredFieldValidator(value, fieldName: 'Device Owner'),
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: widget.deviceTypeController,
              decoration: InputDecoration(labelText: 'Device Type'),
              validator: (value) =>
                  requiredFieldValidator(value, fieldName: 'Device Type'),
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: widget.deviceSerialNumberController,
              decoration: InputDecoration(labelText: 'Device Serial Number'),
              validator: (value) => requiredFieldValidator(
                value,
                fieldName: 'Device Serial Number',
              ),
            ),
            SizedBox(height: 32),
            PrimaryElevatedButton(
              text: 'Save Changes',
              onPressed: () async {
                if (widget.formKey.currentState!.validate()) {
                  if (widget.deviceId != null) {
                    await FirebaseFirestore.instance
                        .collection('devices')
                        .doc(widget.deviceId)
                        .update({
                          'deviceName': widget.deviceNameController.text,
                          'deviceOwner': widget.deviceOwnerController.text,
                          'deviceType': widget.deviceTypeController.text,
                          'deviceSerialNumber':
                              widget.deviceSerialNumberController.text,
                          'deviceStatus': deviceStatusController,
                        });
                    // update existing device
                  } else {
                    await FirebaseFirestore.instance.collection('devices').add({
                      'deviceName': widget.deviceNameController.text,
                      'deviceOwner': widget.deviceOwnerController.text,
                      'deviceType': widget.deviceTypeController.text,
                      'deviceSerialNumber':
                          widget.deviceSerialNumberController.text,
                      'deviceStatus': deviceStatusController,
                    });
                    // add new device
                  }
                  if (mounted) {
                    showAppSnackbar(
                      this.context,
                      'New device added successfully',
                      backgroundColor: Colors.green,
                    );
                    navigateBack(this.context);
                  }
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
