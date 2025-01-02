import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/app_bar_theme.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/theme/input_theme.dart';
import 'package:mobile/theme/text_theme.dart';

final themeProvider = ChangeNotifierProvider<ThemeProvider>((ref) {
    throw UnimplementedError('ThemeProvider is not initialized');
});

class ThemeProvider extends ChangeNotifier{
  bool isDarkmode = true;
  static BaseColorScheme colorScheme = DarkColorScheme.instance;

  ThemeData get themeData => ThemeData(
    scaffoldBackgroundColor: Colors.transparent,
    colorScheme: colorScheme.getColorScheme(),
    textTheme: BaseTextTheme.textTheme,
    inputDecorationTheme: BaseInputTheme.inputTheme,
    appBarTheme: BaseAppBarTheme.appBarTheme,
  );
}