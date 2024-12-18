import 'package:go_router/go_router.dart';
import 'package:mobile/views/home/home_view.dart';

class HomeRoute {
  HomeRoute._();

  static RouteBase get routes => _homeRoute;
  static const String _baseHome = '/home';

  static String get home => _baseHome;

  static final GoRoute _homeRoute = GoRoute(
    path: _baseHome,
    builder: (context, state) => const HomeView(),
  );
}