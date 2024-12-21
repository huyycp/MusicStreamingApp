import 'package:go_router/go_router.dart';
import 'package:mobile/views/edit_profile/edit_profile_view.dart';
import 'package:mobile/views/profile/profile_view.dart';

class ProfileRoute {
  ProfileRoute._();

  static GoRoute get routes => _profileRoute;
  static const String _baseProfile = '/profile';
  static const String _editProfile = 'edit';
  
  static String get profile => _baseProfile;
  static String get editProfile => '$_baseProfile/$_editProfile';

  
  static final GoRoute _profileRoute = GoRoute(
    path: _baseProfile,
    builder: (context, state) => const ProfileView(),
    routes: [
      _editProfileRoute,
    ]
  );

  static final GoRoute _editProfileRoute = GoRoute(
    path: _editProfile,
    builder: (context, state) => const EditProfileView()
  );
}