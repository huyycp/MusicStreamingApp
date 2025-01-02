import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';

class BaseInputTheme {
  BaseInputTheme._();

  static final inputTheme = InputDecorationTheme(
    fillColor: INPUT_FILL_COLOR,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(5),
      borderSide: BorderSide.none,
    ),
    filled: true,
    alignLabelWithHint: true,
  );
}