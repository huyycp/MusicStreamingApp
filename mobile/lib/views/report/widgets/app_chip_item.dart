import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';

class AppChipItem extends StatelessWidget {
  const AppChipItem({
    required this.text,
    required this.isSelected,
    required this.onPressed,
    super.key,
  });

  final String text;
  final bool isSelected;
  final void Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onPressed(text),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? PRIMARY_COLOR : Colors.transparent,
          border: isSelected
            ? null
            : Border.all(color: BUTTON_STROKE, strokeAlign: BorderSide.strokeAlignOutside),
          borderRadius: BorderRadius.circular(100),
        ),
        child: Text(
          text,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            color: isSelected ? PRIMARY_BACKGROUND : Colors.white,
          ),
        ),
      ),
    );
  }
}