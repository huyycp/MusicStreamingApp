import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/text_theme.dart';

final themeProvider = ChangeNotifierProvider<ThemeProvider>((ref) {
    throw UnimplementedError('ThemeProvider is not initialized');
});

class ThemeProvider extends ChangeNotifier{
  ThemeData get themeData => ThemeData(
    textTheme: BaseTextTheme.textTheme,
  );
}