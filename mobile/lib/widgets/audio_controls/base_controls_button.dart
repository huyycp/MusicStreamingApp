import 'package:flutter/material.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class BaseControlsButton extends StatefulWidget {
  final String iconData;
  final String? activeIconData;
  const BaseControlsButton({
    required this.iconData,
    this.activeIconData,
    super.key
  });

  @override
  State<BaseControlsButton> createState() => _BaseControlsButtonState();
}

class _BaseControlsButtonState extends State<BaseControlsButton> {
  bool isActive = false;
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          isActive = !isActive;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
        ),
        child: DynamicImage(
          isActive 
            ? (widget.activeIconData ?? widget.iconData)
            : widget.iconData,
          width: 24, 
          height: 24,
          color: Colors.black,
        ),
      ),
    );
  }
}