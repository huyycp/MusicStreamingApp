import 'package:flutter/material.dart';

class BaseButtonTheme {
  BaseButtonTheme._();

  static final elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      foregroundColor: Colors.black,
      disabledForegroundColor: Colors.black,
      backgroundColor: Color(0xFFFFFFFF),
      disabledBackgroundColor: Color(0xFF535353),
    )
  );
}