import 'package:go_router/go_router.dart';
import 'package:mobile/views/splash/splash_view.dart';

class SplashRoute {
  SplashRoute._();
  
  static RouteBase get routes => _splashRoute;
  
  static final GoRoute _splashRoute = GoRoute(
    path : '/splash',
    builder: (context, state) => const SplashView(),
  );
}