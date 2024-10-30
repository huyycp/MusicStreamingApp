import 'package:flutter/material.dart';

class BaseButtonTheme {
  BaseButtonTheme._();

  static final elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      foregroundColor: Colors.black,
      disabledForegroundColor: Colors.black,
      backgroundColor: const Color(0xFFFFFFFF),
      disabledBackgroundColor: const Color(0xFF535353),
    )
  );
}