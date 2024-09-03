import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';

class SignUpStep2 extends ConsumerStatefulWidget {
  const SignUpStep2({super.key});

  @override
  ConsumerState<SignUpStep2> createState() => _SignUpStep2State();
}

class _SignUpStep2State extends ConsumerState<SignUpStep2> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBar(),
      body: _body(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Create account'),
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
      child: Column(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Create a password', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
              _passwordInput(),
              const SizedBox(height: 8),
              const Text('Use atleast 8 characters. ', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w400),),
              const SizedBox(height: 20),
            ],        
          ),
          _forwardBtn(),
        ],
      )
    );
  }

  Widget _passwordInput() {
    return Form(
      key: ref.read(signUpViewModel).passwordFormKey,
      child: TextFormField(
        obscureText: true,
        validator: passwordValidator,
        controller: ref.read(signUpViewModel).passwordController,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(5),
            borderSide: BorderSide.none
          ),
          fillColor: INPUT_FILL_COLOR,
          filled: true,
        ),
      ),
    );
  }

  Widget _forwardBtn() {
    return  ElevatedButton(
      onPressed: () {
        if (ref.read(signUpViewModel).passwordFormKey.currentState!.validate()) {
          context.push('/sign-up/step-3');
        }
      },
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.white,
        disabledForegroundColor: Colors.black,
        backgroundColor: Color(0xFF535353),
        disabledBackgroundColor: Color(0xFF535353),
      ),
      child: const Text('Next'),
    );
  }
}