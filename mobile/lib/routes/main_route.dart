import 'package:go_router/go_router.dart';
import 'package:mobile/views/main/main_view.dart';

class MainRoute {
  MainRoute._();

  static RouteBase get routes => _mainRoute;
  static const String _baseMain = '/main';

  static String get main => _baseMain;

  static final GoRoute _mainRoute = GoRoute(
    path: _baseMain,
    name: 'main',
    builder: (context, state) => const MainView(),
  );
}