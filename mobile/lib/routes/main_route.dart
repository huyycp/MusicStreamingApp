import 'package:go_router/go_router.dart';
import 'package:mobile/views/main/main_view.dart';

class MainRoute {
  MainRoute._();

  static RouteBase get routes => _mainRoute;

  // static final ShellRoute _mainRoute = ShellRoute(
  //   builder: (context, state, child) => MainView(child: child),
  //   routes: [
  //     HomeRoute.routes,
  //     SearchRoute.routes,
  //     LibraryRoute.detailLibraryRoute,
  //     LibraryRoute.librariesRoute,
  //     ProfileRoute.routes,
  //     ArtistRoute.routes,
  //   ],
  // );

  static final GoRoute _mainRoute = GoRoute(
    path: '/main',
    builder: (context, state) => const MainView(),
  );
}