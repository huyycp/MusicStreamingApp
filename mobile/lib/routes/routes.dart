import 'package:go_router/go_router.dart';
import 'package:mobile/routes/auth_route.dart';
import 'package:mobile/routes/library_route.dart';
import 'package:mobile/routes/main_route.dart';
import 'package:mobile/routes/pick_track_route.dart';
import 'package:mobile/routes/report_route.dart';
import 'package:mobile/routes/splash_route.dart';
import 'package:mobile/routes/track_route.dart';

class RouteConfig {
  RouteConfig._internal();

  static GoRouter get instance => _routeConfig;

  static final _routeConfig = GoRouter(
    initialLocation: '/splash',
    routes: <RouteBase>[
      MainRoute.routes,
      SplashRoute.routes,
      AuthRoute.routes,
      LibraryRoute.routes,
      TrackRoute.routes,
      PickTrackRoute.routes,
      ReportRoute.routes,
    ]
  );
}