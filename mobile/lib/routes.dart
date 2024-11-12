import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/create_album/create_album_view.dart';
import 'package:mobile/views/create_playlist/create_playlist_view.dart';
import 'package:mobile/views/create_track/create_track_audio_view.dart';
import 'package:mobile/views/create_track/create_track_genre_view.dart';
import 'package:mobile/views/create_track/create_track_info_view.dart';
import 'package:mobile/views/create_track/create_track_lyrics_view.dart';
import 'package:mobile/views/create_track/create_track_thumbnail_view.dart';
import 'package:mobile/views/login/login_view.dart';
import 'package:mobile/views/main/main_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/pick_track/pick_track_view.dart';
import 'package:mobile/views/detail_library/detail_library_view.dart';
import 'package:mobile/views/sign_up/select_favorite_genre_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_1_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_2_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_3_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_4_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_5_view.dart';
import 'package:mobile/views/sign_up/verify_email_view.dart';
import 'package:mobile/views/splash/splash_view.dart';

class RouteConfig {
  RouteConfig._internal();

  static final _routeConfig = GoRouter(
    initialLocation: '/splash',
    routes: <RouteBase>[
      _authRoute,
      _mainRoute,
      _splashRoute,
      _trackRoute,
      _pickTrackRoute,
      _libraryRoute,
    ]
  );

  static GoRouter get instance => _routeConfig;

  static final GoRoute _authRoute = GoRoute(
    path: '/auth',
    name: 'auth',
    builder: (context, state) => const AuthMethodsView(),
    routes: <RouteBase>[
      _loginRoute,
      _signUpRoute,
      _verifyEmailRoute,
      _selectFavoriteGenreRoute,
    ]
  );

  static final GoRoute _loginRoute = GoRoute(
    path: 'login',
    name: 'login',
    builder: (context, state) => const LoginView()
  );

  static final GoRoute _signUpRoute = GoRoute(
    path: 'sign-up',
    name: 'sign-up',
    builder: (context, state) => const NotFoundView(),
    routes: <RouteBase>[
      GoRoute(
        path: 'step-1',
        builder: (context, state) => const SignUpStep1View()
      ),
      GoRoute(
        path: 'step-2',
        builder: (context, state) => const SignUpStep2View()
      ),
      GoRoute(
        path: 'step-3',
        builder: (context, state) => const SignUpStep3View()
      ),
      GoRoute(
        path: 'step-4',
        builder: (context, state) => const SignUpStep4View()
      ),
      GoRoute(
        path: 'step-5',
        builder: (context, state) => const SignUpStep5View()
      ),
    ]
  );

  static final GoRoute _verifyEmailRoute = GoRoute(
    path: 'verify-email',
    name: 'verify-email',
    builder: (context, state) => const VerifyEmailView()
  );

  static final GoRoute _selectFavoriteGenreRoute = GoRoute(
    path: 'select-genre',
    builder: (context, state) => const SelectFavoriteGenreView(),
  );

  static final GoRoute _mainRoute = GoRoute(
    path: '/main',
    name: 'main',
    builder: (context, state) => const MainView()
  );

  static final GoRoute _splashRoute = GoRoute(
    path: '/splash',
    name: 'splash',
    builder: (context, state) => const SplashView()
  );

  static final GoRoute _trackRoute = GoRoute(
    path: '/track',
    builder: (context, state) => const NotFoundView(),
    routes: [
      _createTrackRoute,
    ]
  );

  static final GoRoute _createTrackRoute = GoRoute(
    path: 'create',
    name: 'create-track',
    builder: (context, state) => const NotFoundView(),
    routes: [
      GoRoute(
        path: 'track-info',
        builder: (context, state) => const CreateTrackInfoView()
      ),
      GoRoute(
        path: 'audio',
        builder: (context, state) => const CreateTrackAudioView()
      ),
      GoRoute(
        path: 'lyrics',
        builder: (context, state) => const CreateTrackLyricsView( )
      ),
      GoRoute(
        path: 'thumbnail',
        builder: (context, state) => const CreateTrackThumbnailView()
      ),
      GoRoute(
        path: 'genre',
        builder: (context, state) => const CreateTrackGenreView()
      ),
    ]
  );

  static final GoRoute _pickTrackRoute = GoRoute(
    path: '/pick-track/:albumId',
    name: 'pick-track',
    builder: (context, state) => PickTrackView(libraryId: state.pathParameters['albumId'] ?? '')
  );

  static final GoRoute _libraryRoute = GoRoute(
    path: '/library',
    builder: (context, state) => const NotFoundView(),
    routes: [
      GoRoute(
        path: 'create-album',
        name: 'create-album',
        builder: (context, state) => const CreateAlbumView(),
      ),
      GoRoute(
        path: 'create-playlist',
        name: 'create-playlist',
        builder: (context, state) => const CreatePlaylistView(),
      ),
      GoRoute(
        path: ':id',
        name: 'library',
        builder: (context, state) => DetailLibraryView(id: state.pathParameters['id']!)
      )
    ]
  );

}