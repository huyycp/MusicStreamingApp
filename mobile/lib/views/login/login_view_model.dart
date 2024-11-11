import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';

final loginViewModel = ChangeNotifierProvider.autoDispose<LoginViewModel>(
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
  bool? isLoginSuccess = false;

  Future<void> login() async {
    try {
      isLoginSuccess = null;
      notifyListeners();
      isLoginSuccess = await _userRepo.loginWithEmail(
        email: emailController.text, 
        password: passwordController.text
      ).timeout(const Duration(seconds: 30));
      if (isLoginSuccess == true) {
        SnackBarService.showSnackBar(
          message: 'Login successfully',
          status: MessageTypes.success,
        );
        RouteService.routeConfig.go('/main') ;
      } else if (isLoginSuccess == false) {
        SnackBarService.showSnackBar(
          message: 'Login failed',
          status: MessageTypes.success,
        );
      }
      notifyListeners();
    } catch (err) {
      isLoginSuccess = false;
      notifyListeners();
      SnackBarService.showSnackBar(
        message: 'Magic Music takes too long to respond',
        status: MessageTypes.success,
      );
    }
  }

  void clear() {
    emailController.clear();
    passwordController.clear();
  }
}