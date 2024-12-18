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
  static const String _baseAuth = '/auth';
  static const String _login = 'login';
  static const String _signUp = 'sign-up';
  static const String _signUpStep1 = 'step-1';
  static const String _signUpStep2 = 'step-2';
  static const String _signUpStep3 = 'step-3';
  static const String _signUpStep4 = 'step-4';
  static const String _signUpStep5 = 'step-5';
  static const String _verifyEmail = 'verify-email';
  static const String _selectGenre = 'select-genre';

  static String get authMethods => _baseAuth;
  static String get login => '$_baseAuth/$_login';
  static String get signUp => '$_baseAuth/$_signUp';
  static String get signUpStep1 => '$signUp/$_signUpStep1';
  static String get signUpStep2 => '$signUp/$_signUpStep2';
  static String get signUpStep3 => '$signUp/$_signUpStep3';
  static String get signUpStep4 => '$signUp/$_signUpStep4';
  static String get signUpStep5 => '$signUp/$_signUpStep5';
  static String get verifyEmail => '$_baseAuth/$_verifyEmail';
  static String get selectGenre => '$_baseAuth/$_selectGenre';

  static final GoRoute _authRoute = GoRoute(
    path: _baseAuth,
    name: 'auth',
    builder: (context, state) => const AuthMethodsView(),
    routes: <RouteBase>[
      loginRoute,
      signUpRoute,
      verifyEmailRoute,
      selectFavoriteGenreRoute,
    ]
  );

  static GoRoute get loginRoute => GoRoute(
    path: _login,
    name: 'login',
    builder: (context, state) => const LoginView()
  );

  static GoRoute get signUpRoute => GoRoute(
    path: _signUp,
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
    path: _verifyEmail,
    name: 'verify-email',
    builder: (context, state) => const VerifyEmailView()
  );

  static GoRoute get selectFavoriteGenreRoute => GoRoute(
    path: _selectGenre,
    builder: (context, state) => const SelectFavoriteGenreView(),
  );
}