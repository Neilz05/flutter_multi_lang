import "package:flutter/material.dart";
import 'package:flutter_application_1/constants.dart';

//stateless widgets
class PrimaryButton extends StatelessWidget {
  const PrimaryButton({super.key, required this.onPressed, required this.text});

  final VoidCallback onPressed;
  final String text;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 32,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 0, vertical: 0),
          // textStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          // shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
        ),
        child: Text(text),
      ),
    );
  }
}

class PaddedContainer extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color? color;
  const PaddedContainer({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.symmetric(horizontal: 16.0),
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(padding: padding, color: color, child: child);
  }
}

//stateful widgets
class OptionSwitch extends StatefulWidget {
  final bool initialValue;
  final ValueChanged<bool>? onChanged;

  const OptionSwitch({super.key, required this.initialValue, this.onChanged});

  @override
  State<OptionSwitch> createState() => _OptionSwitchState();
}

class _OptionSwitchState extends State<OptionSwitch> {
  late bool value;

  @override
  void initState() {
    super.initState();
    value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Switch(
      trackOutlineColor: WidgetStateProperty.resolveWith<Color>((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryColor; // Active color
        }
        return Colors.grey; // Inactive color
      }),
      // activeColor: Colors.red,
      // trackColor: WidgetStateColor.fromMap({
      //   WidgetState.selected: primaryColor,
      //   WidgetState.disabled: Colors.grey,
      // }),
      thumbIcon: WidgetStateProperty.all(const Icon(null)),
      thumbColor: WidgetStateProperty.all(Colors.white),
      activeTrackColor: primaryColor,
      inactiveThumbColor: Colors.black,
      inactiveTrackColor: Colors.grey,
      value: value,
      onChanged: (bool val) {
        setState(() {
          value = val;
        });
        if (widget.onChanged != null) {
          widget.onChanged!(val);
        }
      },
    );
  }
}
