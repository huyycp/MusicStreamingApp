import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/login/login_view_model.dart';
import 'package:mobile/widgets/loading_widget.dart';
import 'package:password_text_field/password_text_field.dart';

class LoginView extends ConsumerStatefulWidget {
  const LoginView({super.key});

  @override
  ConsumerState<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends ConsumerState<LoginView> {
  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvokedWithResult: (_, __) => ref.read(loginViewModel).clear(),
      child: Scaffold(
        appBar: _appBar(),
        body: _body()
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Login'),
      centerTitle: true,
      leading: IconButton(
        icon: SvgPicture.asset('assets/icons/ic_chevron_left.svg'),
        onPressed: () {
          context.pop();
        },
      ),
    );
  }

  Widget _body() {
    return Container(
      padding: const EdgeInsets.all(30),
      child: Form(
        key: ref.read(loginViewModel).loginFormKey,
        child: Column(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('Email', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
                  _emailInput(),
                  const SizedBox(height: 12),
                  const Text('Password', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
                  _passwordInput(),
                ],        
              ),
            ),
            _loginBtn(),
          ],
        ),
      )
    );
  }

  Widget _emailInput() {
    return TextFormField(
      validator: emailValidator,
      keyboardType: TextInputType.emailAddress,
      controller: ref.read(loginViewModel).emailController,
    );
  }

  Widget _passwordInput() {
    return PasswordTextFormField(
      validator: emptyValidator,
      initialObscurity: true,
      controller: ref.read(loginViewModel).passwordController,
    );
  }

  Widget _loginBtn() {
    return ElevatedButton(
      onPressed: ref.watch(loginViewModel.select((value) => value.isLoginSuccess == false)) 
        ? () {
            if (ref.read(loginViewModel).loginFormKey.currentState!.validate()) {
              ref.read(loginViewModel).login();
            }
          }
        : null,
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.black,
        disabledForegroundColor: Colors.black,
        backgroundColor: const Color(0xFFFFFFFF),
        disabledBackgroundColor: const Color(0xFF535353),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          LoadingWidget(
            visible: ref.watch(loginViewModel.select((value) => value.isLoginSuccess == null))
          ),
          const Text('Login'),
        ],
      ),
    );
  }
}