import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:password_text_field/password_text_field.dart';

class SignUpStep2View extends ConsumerStatefulWidget {
  const SignUpStep2View({super.key});

  @override
  ConsumerState<SignUpStep2View> createState() => _SignUpStep2State();
}

class _SignUpStep2State extends ConsumerState<SignUpStep2View> {
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
    return BaseContainer(
      padding: const EdgeInsets.all(30),
      child: Column(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Create a password', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
              _passwordInput(),
            ],        
          ),
          const SizedBox(height: 20),
          _forwardBtn(),
        ],
      )
    );
  }

  Widget _passwordInput() {
    return Form(
      key: ref.read(signUpViewModel).passwordFormKey,
      child: PasswordTextFormField(
        initialObscurity: true,
        validator: passwordValidator,
        cursorColor: Colors.white,
        controller: ref.read(signUpViewModel).passwordController,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(5),
            borderSide: BorderSide.none
          ),
          fillColor: INPUT_FILL_COLOR,
          filled: true,
          errorMaxLines: 5,
        ),
      ),
    );
  }

  Widget _forwardBtn() {
    return ForwardButton(
      onPressed: () {
        context.push('/auth/sign-up/step-3');
      },
    );
  }
}