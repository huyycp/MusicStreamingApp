import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/theme/theme_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: "dev.env");
  runApp(ProviderScope(
    overrides: [
      themeProvider.overrideWith((ref) => ThemeProvider())
    ],
    child: MyApp()
  ));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'Music Streaming App',
      theme: ref.read(themeProvider).themeData,
      routerConfig: routeConfig,
    );
  }
}

