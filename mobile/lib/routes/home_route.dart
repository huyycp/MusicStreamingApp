import 'package:go_router/go_router.dart';
import 'package:mobile/views/home/home_view.dart';

class HomeRoute {
  HomeRoute._();

  static RouteBase get routes => _homeRoute;

  static final GoRoute _homeRoute = GoRoute(
    path: '/home',
    builder: (context, state) => const HomeView(),
  );
}