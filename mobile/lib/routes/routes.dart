import 'package:go_router/go_router.dart';
import 'package:mobile/routes/artist_route.dart';
import 'package:mobile/routes/auth_route.dart';
import 'package:mobile/routes/home_route.dart';
import 'package:mobile/routes/library_route.dart';
import 'package:mobile/routes/main_route.dart';
import 'package:mobile/routes/pick_track_route.dart';
import 'package:mobile/routes/profile_route.dart';
import 'package:mobile/routes/report_route.dart';
import 'package:mobile/routes/search_route.dart';
import 'package:mobile/routes/splash_route.dart';
import 'package:mobile/routes/track_route.dart';

class RouteConfig {
  RouteConfig._internal();

  static GoRouter get instance => _routeConfig;

  static final _routeConfig = GoRouter(
    initialLocation: RouteNamed.splash,
    routes: <RouteBase>[
      MainRoute.routes,
      SplashRoute.routes,
      AuthRoute.routes,
      LibraryRoute.routes,
      TrackRoute.routes,
      PickTrackRoute.routes,
      ReportRoute.routes,
      ProfileRoute.routes,
    ]
  );
}

class RouteNamed {
  RouteNamed._();

  // Auth
  static String authMethods = AuthRoute.authMethods;
  static String login = AuthRoute.login;
  static String signUp = AuthRoute.signUp;
  static String signUpStep1 = AuthRoute.signUpStep1;
  static String signUpStep2 = AuthRoute.signUpStep2;
  static String signUpStep3 = AuthRoute.signUpStep3;
  static String signUpStep4 = AuthRoute.signUpStep4;
  static String signUpStep5 = AuthRoute.signUpStep5;
  static String verifyEmail = AuthRoute.verifyEmail;
  static String selectGenre = AuthRoute.selectGenre;

  // Main
  static String main = MainRoute.main;

  // Home
  static String home = HomeRoute.home;

  // Search 
  static String search = SearchRoute.search;

  // Library
  static String library = LibraryRoute.library;
  static String createAlbum = LibraryRoute.createAlbum;
  static String createPlaylist = LibraryRoute.createPlaylist;
  
  // Profile
  static String profile = ProfileRoute.profile;
  static String editProfile = ProfileRoute.editProfile;

  // Artist
  static String artist = ArtistRoute.artist;

  // Pick track
  static String pickTrack = PickTrackRoute.pickTrack;

  // Report
  static String report = ReportRoute.report;
  static String createReport = ReportRoute.createReport;

  // Splash
  static String splash = SplashRoute.splash;

  // Track
  static String createTrack = TrackRoute.createTrack;
  static String createTrackInfo = TrackRoute.createTrackInfo;
  static String createTrackAudio = TrackRoute.createTrackAudio;
  static String createTrackLyrics = TrackRoute.createTrackLyrics;
  static String createTrackThumbnail = TrackRoute.createTrackThumbnail;
  static String createTrackGenre = TrackRoute.createTrackGenre;
  static String pickPlaylist = TrackRoute.pickPlaylist;
}