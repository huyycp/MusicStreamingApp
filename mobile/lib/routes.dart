import 'package:go_router/go_router.dart';
import 'package:mobile/views/auth_methods/auth_methods_view.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/sign_up/sign_up_step_1.dart';
import 'package:mobile/views/sign_up/sign_up_step_2.dart';
import 'package:mobile/views/sign_up/sign_up_step_3.dart';
import 'package:mobile/views/sign_up/sign_up_step_4.dart';

final routeConfig = GoRouter(
  initialLocation: '/auth',
  routes: <RouteBase>[
    GoRoute(
      path: '/auth',
      builder: (context, state) => AuthMethodsView()
    ),
    GoRoute(
      path: '/sign-up',
      builder: (context, state) => NotFoundView(),
      routes: <RouteBase>[
        GoRoute(
          path: 'step-1',
          builder: (context, state) => SignUpStep1()
        ),
        GoRoute(
          path: 'step-2',
          builder: (context, state) => SignUpStep2()
        ),
        GoRoute(
          path: 'step-3',
          builder: (context, state) => SignUpStep3()
        ),
        GoRoute(
          path: 'step-4',
          builder: (context, state) => SignUpStep4()
        ),
      ]
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => HomeView()
    )
  ]
);