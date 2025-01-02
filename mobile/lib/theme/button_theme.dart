import 'package:flutter/material.dart';
import 'package:mobile/theme/text_theme.dart';

class BaseButtonTheme {
  BaseButtonTheme._();

  static final elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      foregroundColor: Colors.black,
      disabledForegroundColor: Colors.black,
      backgroundColor: const Color(0xFFFFFFFF),
      disabledBackgroundColor: const Color(0xFF535353),
      textStyle: BaseTextTheme.LABEL_BUTTON,
    )
  );
}