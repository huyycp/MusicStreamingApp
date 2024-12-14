import 'package:go_router/go_router.dart';
import 'package:mobile/views/edit_profile/edit_profile_view.dart';
import 'package:mobile/views/profile/profile_view.dart';

class ProfileRoute {
  ProfileRoute._();

  static GoRoute get routes => _profileRoute;
  
  static final GoRoute _profileRoute = GoRoute(
    path: '/profile',
    builder: (context, state) => const ProfileView(),
    routes: [
      _editProfileRoute,
    ]
  );

  static final GoRoute _editProfileRoute = GoRoute(
    path: 'edit',
    builder: (context, state) => const EditProfileView()
  );
}