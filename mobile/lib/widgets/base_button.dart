import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/theme/text_theme.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    this.onPressed,
    required this.child,
    this.type = ButtonType.elevated,
    this.border = ButtonBorder.square,
    this.isPrimary = false,
    super.key,
  });

  final void Function()? onPressed;
  final Widget child;
  final ButtonType type;
  final ButtonBorder border;
  final bool isPrimary;

  @override
  Widget build(BuildContext context) {
    final borderRadius = border == ButtonBorder.round ? BorderRadius.circular(100) : BorderRadius.circular(8);
    switch (type) {
      case ButtonType.elevated:
        final bgColor = isPrimary ? PRIMARY_COLOR : Colors.white;
        const textColor = Colors.black;
        return ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            textStyle: BaseTextTheme.LABEL_BUTTON,
            backgroundColor: bgColor,
            foregroundColor: textColor,
            shape: RoundedRectangleBorder(
              borderRadius: borderRadius,
            )
          ),
          child: child,
        );
      case ButtonType.outlined:
        final strokeColor = isPrimary ? PRIMARY_COLOR : BUTTON_STROKE;
        final textColor = isPrimary ? PRIMARY_COLOR : Colors.white;
        return OutlinedButton(
          onPressed: onPressed,
          style: OutlinedButton.styleFrom(
            foregroundColor: textColor,
            textStyle: BaseTextTheme.LABEL_BUTTON,
            shape: RoundedRectangleBorder(
              borderRadius: borderRadius,
            ),
            side: BorderSide(
              color: strokeColor
            )
          ),
          child: child,
        );
      case ButtonType.text:
        final textColor = isPrimary ? PRIMARY_COLOR : Colors.white;
        return TextButton(
          onPressed: onPressed,
          style: TextButton.styleFrom(
            foregroundColor: textColor,
            textStyle: BaseTextTheme.LABEL_BUTTON,
            shape: RoundedRectangleBorder(
              borderRadius: borderRadius,
            )
          ),
          child: child,
        );
    }
  }
}

enum ButtonType {
  elevated,
  outlined,
  text,
}

enum ButtonBorder {
  round,
  square,
}