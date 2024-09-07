import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_1_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_2_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_3_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_4_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_5_view.dart';
import 'package:mobile/views/sign_up/verify_email_view.dart';

final routeConfig = GoRouter(
  initialLocation: '/auth',
  routes: <RouteBase>[
    GoRoute(
      path: '/auth',
      builder: (context, state) => AuthMethodsView(),
      routes: <RouteBase>[
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
      path: '/home',
      builder: (context, state) => HomeView()
    )
  ]
);