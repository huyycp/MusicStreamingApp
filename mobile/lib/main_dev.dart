import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/theme/theme_provider.dart';
import 'package:mobile/utils/snackbar.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: "dev.env");
  runApp(ProviderScope(
    overrides: [
      themeProvider.overrideWith((ref) => ThemeProvider())
    ],
    child: const MyApp() 
  ));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      scaffoldMessengerKey: SnackBarService.scaffoldMessengerKey,
      title: 'Music Streaming App',
      theme: ref.read(themeProvider).themeData,
      routerConfig: RouteService.routeConfig,
      debugShowCheckedModeBanner: false,
    );
  }
}

