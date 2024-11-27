import 'package:go_router/go_router.dart';
import 'package:mobile/views/profile/profile_view.dart';

class ProfileRoute {
  ProfileRoute._();

  static GoRoute get routes => _profileRoute;
  
  static final GoRoute _profileRoute = GoRoute(
    path: '/profile',
    builder: (context, state) => const ProfileView()
  );
}