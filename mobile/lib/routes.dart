import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/create_track/create_track_audio_view.dart';
import 'package:mobile/views/create_track/create_track_info_view.dart';
import 'package:mobile/views/create_track/create_track_lyrics_view.dart';
import 'package:mobile/views/create_track/create_track_thumbnail_view.dart';
import 'package:mobile/views/login/login_view.dart';
import 'package:mobile/views/main/main_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_1_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_2_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_3_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_4_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_5_view.dart';
import 'package:mobile/views/sign_up/verify_email_view.dart';
import 'package:mobile/views/splash/splash_view.dart';

final routeConfig = GoRouter(
  initialLocation: '/splash',
  routes: <RouteBase>[
    GoRoute(
      path: '/auth',
      builder: (context, state) => AuthMethodsView(),
      routes: <RouteBase>[
        GoRoute(
          path: 'login',
          builder: (context, state) => LoginView()
        ),
        GoRoute(
          path: 'sign-up',
          builder: (context, state) => NotFoundView(),
          routes: <RouteBase>[
            GoRoute(
              path: 'step-1',
              builder: (context, state) => SignUpStep1View()
            ),
            GoRoute(
              path: 'step-2',
              builder: (context, state) => SignUpStep2View()
            ),
            GoRoute(
              path: 'step-3',
              builder: (context, state) => SignUpStep3View()
            ),
            GoRoute(
              path: 'step-4',
              builder: (context, state) => SignUpStep4View()
            ),
            GoRoute(
              path: 'step-5',
              builder: (context, state) => SignUpStep5View()
            ),
          ]
        ),
        GoRoute(
          path: 'verify-email',
          builder: (context, state) => VerifyEmailView()
        ),
      ]
    ),
    GoRoute(
      path: '/main',
      builder: (context, state) => MainView()
    ),
    GoRoute(
      path: '/splash',
      builder: (context, state) => SplashView()
    ),
    GoRoute(
      path: '/track',
      builder: (context, state) => NotFoundView(),
      routes: [
        GoRoute(
          path: 'create',
          builder: (context, state) => NotFoundView(),
          routes: [
            GoRoute(
              path: 'track-info',
              builder: (context, state) => CreateTrackInfoView()
            ),
            GoRoute(
              path: 'audio',
              builder: (context, state) => CreateTrackAudioView()
            ),
            GoRoute(
              path: 'lyrics',
              builder: (context, state) => CreateTrackLyricsView( )
            ),
            GoRoute(
              path: 'thumbnail',
              builder: (context, state) => CreateTrackThumbnailView()
            ),
          ]
        )
      ]
    )
  ]
);