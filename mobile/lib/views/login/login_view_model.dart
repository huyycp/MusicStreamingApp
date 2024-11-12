import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';
import 'package:string_validator/string_validator.dart';

final loginViewModel = ChangeNotifierProvider.autoDispose<LoginViewModel>(
  (ref) => LoginViewModel(ref.read(userRepoProvider))
);

class LoginViewModel extends ChangeNotifier{
  LoginViewModel(UserRepository userRepo) {
    _userRepo = userRepo;
    emailController.addListener(checkValidInfor);
    passwordController.addListener(checkValidInfor);
  }

  late final UserRepository _userRepo;

  final loginFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool? isLoginSuccess = false;
  bool isValidInfor = false;

  Future<void> login() async {
    try {
      isLoginSuccess = null;
      notifyListeners();
      isLoginSuccess = await _userRepo.loginWithEmail(
        email: emailController.text, 
        password: passwordController.text
      ).timeout(const Duration(seconds: 30));
      if (isLoginSuccess == true) {
        SnackBarUtils.showSnackBar(
          message: 'Login successfully',
          status: MessageTypes.success,
        );
        RouteConfig.instance.go('/main') ;
      } else if (isLoginSuccess == false) {
        SnackBarUtils.showSnackBar(
          message: 'Login failed',
          status: MessageTypes.success,
        );
      }
      notifyListeners();
    } catch (err) {
      isLoginSuccess = false;
      notifyListeners();
      SnackBarUtils.showSnackBar(
        message: 'Magic Music takes too long to respond',
        status: MessageTypes.info,
      );
    }
  }

  void checkValidInfor() {
    isValidInfor = (
      emailController.text.isNotEmpty &&
      emailController.text.isEmail &&
      passwordController.text.isNotEmpty
    );
    notifyListeners();
  }

  void clear() {
    emailController.clear();
    passwordController.clear();
  }
}