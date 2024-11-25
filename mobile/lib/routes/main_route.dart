import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes/artist_route.dart';
import 'package:mobile/routes/home_route.dart';
import 'package:mobile/routes/library_route.dart';
import 'package:mobile/routes/profile_route.dart';
import 'package:mobile/routes/search_route.dart';
import 'package:mobile/views/main/widgets/track_player_widget.dart';
import 'package:mobile/widgets/app_navbar.dart';

class MainRoute {
  MainRoute._();

  static RouteBase get routes => _mainRoute;

  static final ShellRoute _mainRoute = ShellRoute(
    builder: (context, state, child) {
      return Scaffold(
        extendBody: true,
        extendBodyBehindAppBar: true,
        body: child,
        bottomNavigationBar: const AppNavbar(),
        floatingActionButton: const TrackPlayerWidget(),
        floatingActionButtonLocation: FloatingActionButtonLocation.miniCenterFloat,
      );
    },
    routes: [
      HomeRoute.routes,
      SearchRoute.routes,
      LibraryRoute.librariesRoute,
      LibraryRoute.detailLibraryRoute,
      ProfileRoute.routes,
      ArtistRoute.routes,
    ],
  );
 
}