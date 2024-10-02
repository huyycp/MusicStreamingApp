import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/app_bar_theme.dart';
import 'package:mobile/theme/button_theme.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/theme/input_theme.dart';
import 'package:mobile/theme/text_theme.dart';

final themeProvider = ChangeNotifierProvider<ThemeProvider>((ref) {
    throw UnimplementedError('ThemeProvider is not initialized');
});

class ThemeProvider extends ChangeNotifier{
  ThemeData get themeData => ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: PRIMARY_BACKGROUND,
    textTheme: BaseTextTheme.textTheme,
    inputDecorationTheme: BaseInputTheme.inputTheme,
    elevatedButtonTheme: BaseButtonTheme.elevatedButtonTheme,
    appBarTheme: BaseAppBarTheme.appBarTheme,
  );
}