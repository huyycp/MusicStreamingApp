import 'package:go_router/go_router.dart';
import 'package:mobile/views/splash/splash_view.dart';

class SplashRoute {
  SplashRoute._();
  
  static RouteBase get routes => _splashRoute;
  static const String _baseSplash = '/splash';

  static String get splash => _baseSplash;
  
  static final GoRoute _splashRoute = GoRoute(
    path : _baseSplash,
    builder: (context, state) => const SplashView(),
  );
}