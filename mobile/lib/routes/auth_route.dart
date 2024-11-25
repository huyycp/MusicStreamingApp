import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/login/login_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/sign_up/select_favorite_genre_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_1_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_2_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_3_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_4_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_5_view.dart';
import 'package:mobile/views/sign_up/verify_email_view.dart';

class AuthRoute {
  AuthRoute._();

  static RouteBase get routes => _authRoute;
  
  static final GoRoute _authRoute = GoRoute(
    path: '/auth',
    name: 'auth',
    builder: (context, state) => const AuthMethodsView(),
    routes: <RouteBase>[
      loginRoute,
      signUpRoute,
      verifyEmailRoute,
      selectFavoriteGenreRoute,
    ]
  );

  static GoRoute get authMethodsRoute => GoRoute(
    path: '/auth',
    name: 'auth',
    builder: (context, state) => const AuthMethodsView(),
  );

  static GoRoute get loginRoute => GoRoute(
    path: 'login',
    name: 'login',
    builder: (context, state) => const LoginView()
  );

  static GoRoute get signUpRoute => GoRoute(
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

  static GoRoute get verifyEmailRoute => GoRoute(
    path: 'verify-email',
    name: 'verify-email',
    builder: (context, state) => const VerifyEmailView()
  );

  static GoRoute get selectFavoriteGenreRoute => GoRoute(
    path: 'select-genre',
    builder: (context, state) => const SelectFavoriteGenreView(),
  );
}