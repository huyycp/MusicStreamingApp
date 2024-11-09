import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/user_repository.dart';

final signUpViewModel = ChangeNotifierProvider.autoDispose<SignUpViewModel>(
  (ref) => SignUpViewModel(ref.read(userRepoProvider))
);

class SignUpViewModel extends ChangeNotifier{
  SignUpViewModel(UserRepository userRepo) {
    _userRepo = userRepo;
  }

  late final UserRepository _userRepo;

  final emailFormKey = GlobalKey<FormState>();
  final passwordFormKey = GlobalKey<FormState>();
  final genderFormKey = GlobalKey<FormState>();
  final nameFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final genderController = TextEditingController(text: 'Male');
  final nameController = TextEditingController();
  UserRole userRole = UserRole.listener;

  bool verifySuccess = false;
  bool registerSuccess = false;
  List<String> availableEmails = [''];

  void changeUserRole(UserRole? value) {
    if (value == null || value == userRole) return;
    userRole = value;
    notifyListeners();
  }

  Future<void> registerWithEmail() async {
    registerSuccess = await _userRepo.registerWithEmail(
      email: emailController.text,
      password: passwordController.text,
      gender: genderController.text,
      name: nameController.text,
      role: userRole,
    );
    notifyListeners();
  } 

  Future<void> getAuthOTP() async {
    await _userRepo.getAuthOTP(emailController.text);
  }

  Future<void> verifyEmail(String otp) async {
    verifySuccess = await _userRepo.verifyEmail(
      email: emailController.text, 
      otp: otp
    );
    notifyListeners();
  }

  Future<void> getAvailableEmails() async {
    availableEmails = await _userRepo.getAvailableEmails();
    notifyListeners();
  }

  void clear() {
    emailController.clear();
    passwordController.clear();
    genderController.clear();
    nameController.clear();
    userRole = UserRole.listener;
    verifySuccess = false;
    registerSuccess = false;
  }
}
