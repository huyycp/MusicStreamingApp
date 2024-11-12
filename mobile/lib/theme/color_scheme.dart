import 'dart:ui';

import 'package:flutter/material.dart';

const PRIMARY_COLOR         = Color(0xFF1ED760);
const PRIMARY_BACKGROUND    = Color(0XFF0E0E0E);
const BODY_TEXT             = Color(0xFFB8B8B8);
const LABEL_COLOR           = Color(0xFFB3B3B3);
const GRAY_BUTTON           = Color(0xFF2A2A2A);
const GREEN_BUTTON          = Color(0xFF14833B);
const GRAY_BCK_1            = Color(0xFF282828);
const GRAY_BCK_2            = Color(0xFF444444);
const DIVIDER               = Color(0xFF1B1B1B);
const TRACK_LINE            = Color(0xFF2A2A2A);
const BUTTON_STROKE         = Color(0xFF7F7F7F);
const INPUT_FILL_COLOR      = Color(0xFF777777);
const INFORMATION_COLOR     = Color(0xFF2C5EE8);
const SUCCESS_COLOR         = Color(0xFFB0FC72);
const WARNING_COLOR         = Color(0xFFE9AB25);
const ERROR_COLOR           = Color(0xFFFB384D);

abstract class BaseColorScheme {
  Color get PRIMARY_BACKGROUND; 
  Color get PRIMARY_TEXT;
  Color get SECONDARY_TEXT;
  Color get ALTERNATE;     
  Color get BORDER;          
  Color get SECONDARY_BACKGROUND;
  Brightness get BRIGHTNESS;

  ColorScheme getColorScheme() {
    return ColorScheme(
      brightness: BRIGHTNESS,
      primary: PRIMARY_COLOR,
      onPrimary: Colors.white,
      secondary: PRIMARY_COLOR,
      onSecondary: Colors.white,
      error: ERROR_COLOR,
      onError: Colors.white,
      surface: PRIMARY_BACKGROUND,
      onSurface: PRIMARY_TEXT,
      background: PRIMARY_BACKGROUND,
      onBackground: PRIMARY_TEXT,
      outline: BORDER,
    );
  }
}

/// Light mode
class LightColorScheme extends BaseColorScheme{
  LightColorScheme._();
  static final _instance = LightColorScheme._();
  static LightColorScheme get instance => _instance;

  @override
  final Color PRIMARY_BACKGROUND   = const Color(0xFFF5F6FA);
  @override
  final Color PRIMARY_TEXT         = const Color(0xFF01050F);
  @override
  final Color SECONDARY_TEXT       = const Color(0xFF3E414A);
  @override
  final Color ALTERNATE            = const Color(0xFF7C7D84);
  @override
  final Color BORDER               = const Color(0xFFD1D1D7);
  @override
  final Color SECONDARY_BACKGROUND = const Color(0xFFEFEEF3);
  @override
  final Brightness BRIGHTNESS      = Brightness.light;
}

/// Dark mode
class DarkColorScheme extends BaseColorScheme{
  DarkColorScheme._();
  static final _instance = DarkColorScheme._();
  static DarkColorScheme get instance => _instance;

  @override
  final Color PRIMARY_BACKGROUND   = const Color(0xFF01050F);
  @override
  final Color PRIMARY_TEXT         = const Color(0xFFF6F5FA);
  @override
  final Color SECONDARY_TEXT       = const Color(0xFFB9B9BF);
  @override
  final Color ALTERNATE            = const Color(0xFF7C7D84);
  @override
  final Color BORDER               = const Color(0xFF262932);
  @override
  final Color SECONDARY_BACKGROUND = const Color(0xFF151822);
  @override
  final Brightness BRIGHTNESS      = Brightness.dark;
}
