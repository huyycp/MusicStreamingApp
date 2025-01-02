import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/login/login_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/sign_up/select_favorite_genre_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_email.dart';
import 'package:mobile/views/sign_up/sign_up_step_password.dart';
import 'package:mobile/views/sign_up/sign_up_step_gender_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_name.dart';
import 'package:mobile/views/sign_up/sign_up_step_role_view.dart';
import 'package:mobile/views/sign_up/verify_email_view.dart';

class AuthRoute {
  AuthRoute._();

  static RouteBase get routes => _authRoute;
  static const String _baseAuth = '/auth';
  static const String _login = 'login';
  static const String _signUp = 'sign-up';
  static const String _signUpStepEmail = 'step-email';
  static const String _signUpStepPassword = 'step-password';
  static const String _signUpStepGender = 'step-gender';
  static const String _signUpStepName = 'step-name';
  static const String _signUpStepRole = 'step-role';
  static const String _verifyEmail = 'verify-email';
  static const String _selectGenre = 'select-genre';

  static String get authMethods => _baseAuth;
  static String get login => '$_baseAuth/$_login';
  static String get signUp => '$_baseAuth/$_signUp';
  static String get signUpStepEmail => '$signUp/$_signUpStepEmail';
  static String get signUpStepPassword => '$signUp/$_signUpStepPassword';
  static String get signUpStepGender => '$signUp/$_signUpStepGender';
  static String get signUpStepName => '$signUp/$_signUpStepName';
  static String get signUpStepRole => '$signUp/$_signUpStepRole';
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
        path: 'step-email',
        builder: (context, state) => const SignUpStepEmail()
      ),
      GoRoute(
        path: 'step-password',
        builder: (context, state) => const SignUpPassStepPassword()
      ),
      GoRoute(
        path: 'step-gender',
        builder: (context, state) => const SignUpStepGenderView()
      ),
      GoRoute(
        path: 'step-name',
        builder: (context, state) => const SignUpStepNameView()
      ),
      GoRoute(
        path: 'step-role',
        builder: (context, state) => const SignUpStepRole()
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