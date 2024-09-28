import 'package:flutter/material.dart';
import 'package:mobile/theme/text_theme.dart';

class BaseAppBarTheme {
  static final appBarTheme = AppBarTheme(
    backgroundColor: Colors.transparent,
    titleTextStyle: BaseTextTheme.HEADLINE_SMALL..copyWith(
      color: Colors.white
    ),
    // color: Colors.white,
  );
}