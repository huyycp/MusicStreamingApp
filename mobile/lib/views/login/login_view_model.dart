import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';

final loginViewModel = ChangeNotifierProvider<LoginViewModel>(
  (ref) => LoginViewModel(ref.read(userRepoProvider))
);

class LoginViewModel extends ChangeNotifier{
  LoginViewModel(UserRepository userRepo) {
    _userRepo = userRepo;
  }

  late final UserRepository _userRepo;

  final loginFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool loginSuccess = false;

  Future<void> login() async {
    loginSuccess = await _userRepo.loginWithEmail(
      email: emailController.text, 
      password: passwordController.text
    );
    notifyListeners();
  }

  void clear() {
    emailController.clear();
    passwordController.clear();
  }
}