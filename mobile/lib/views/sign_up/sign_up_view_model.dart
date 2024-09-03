import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final signUpViewModel = ChangeNotifierProvider<SignUpViewModel>(
  (ref) => SignUpViewModel()
);

class SignUpViewModel extends ChangeNotifier{
  SignUpViewModel();

  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final genderController = TextEditingController(text: 'Male');
  final nameController = TextEditingController();
  final emailFormKey = GlobalKey<FormState>();
  final passwordFormKey = GlobalKey<FormState>();
  final genderFormKey = GlobalKey<FormState>();
  final nameFormKey = GlobalKey<FormState>();
}