import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio_background/just_audio_background.dart';
import 'package:mobile/build_config.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/theme_provider.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);
  await dotenv.load(fileName: "prod.env");
  await JustAudioBackground.init(
    androidNotificationChannelId: BuildConfig.appScheme,
    androidNotificationChannelName: BuildConfig.appName,
    androidNotificationOngoing: true,
  );
  await SentryFlutter.init(
    (options) {
      options
        ..dsn = dotenv.env['SENTRY_DSN']!
        ..environment = dotenv.env['SENTRY_ENV']!
        ..tracesSampleRate = 1.0
        ..profilesSampleRate = 1.0;
    },
      appRunner: () => runApp(ProviderScope(
      overrides: [
        themeProvider.overrideWith((ref) => ThemeProvider())
      ],
      child: const MyApp()
    ))
  );
  
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      scaffoldMessengerKey: SnackBarUtils.scaffoldMessengerKey,
      title: 'Music Streaming App',
      theme: ref.read(themeProvider).themeData,
      routerConfig: RouteConfig.instance,
      debugShowCheckedModeBanner: false,
      builder: (context, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(textScaleFactor: 1), 
        child: child!,
      ),
    );
  }
}


