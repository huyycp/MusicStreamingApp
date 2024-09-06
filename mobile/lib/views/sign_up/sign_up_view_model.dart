import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final signUpViewModel = ChangeNotifierProvider<SignUpViewModel>(
  (ref) => SignUpViewModel()
);

class SignUpViewModel extends ChangeNotifier{
  SignUpViewModel();

  final emailFormKey = GlobalKey<FormState>();
  final passwordFormKey = GlobalKey<FormState>();
  final genderFormKey = GlobalKey<FormState>();
  final nameFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final genderController = TextEditingController(text: 'Male');
  final nameController = TextEditingController();
  UserRole userRole = UserRole.listener;

  void changeUserRole(UserRole? value) {
    if (value == null || value == userRole) return;
    userRole = value;
    notifyListeners();
  }
}

enum UserRole {
  listener,
  artist
}