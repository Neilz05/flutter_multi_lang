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
      height: primaryButtonHeight,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 0, vertical: 0),
          textStyle: TextStyle(
            fontSize: primaryButtonFontSize,
            fontWeight: FontWeight.bold,
          ),
          // shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
        ),
        child: Text(text),
      ),
    );
  }
}

class VerticalSpacing extends StatelessWidget {
  final double? height;

  const VerticalSpacing({super.key, this.height});

  @override
  Widget build(BuildContext context) {
    if (height == null) {
      return const SizedBox(height: spacing16); // for slight performance boost
    } else {
      return SizedBox(height: height);
    }
  }
}

class HorizontalSpacing extends StatelessWidget {
  final double? width;

  const HorizontalSpacing({super.key, this.width});

  @override
  Widget build(BuildContext context) {
    if (width == null) {
      return const SizedBox(width: spacing16); // for slight performance boost
    } else {
      return SizedBox(width: width);
    }
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

class PrimaryElevatedButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final IconData? icon;

  const PrimaryElevatedButton({
    super.key,
    required this.text,
    this.onPressed,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      // width: 250,
      child: ElevatedButton.icon(
        icon: icon != null ? Icon(icon) : SizedBox.shrink(),
        style: ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
        ),
        onPressed: onPressed,
        label: Text(
          text,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    );
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
          return Theme.of(context).colorScheme.primary; // Active color
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
      activeTrackColor: Theme.of(context).colorScheme.primary,
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
