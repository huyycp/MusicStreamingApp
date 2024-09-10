import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/views/sign_up/widgets/sign_up_app_bar.dart';

class SignUpStep4View extends ConsumerStatefulWidget {
  const SignUpStep4View({super.key});

  @override
  ConsumerState<SignUpStep4View> createState() => _SignUpStep4State();
}

class _SignUpStep4State extends ConsumerState<SignUpStep4View> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SignUpAppBar(text: 'Create account', context: context),
      body: _body(),
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
              Text(
                'What\'s your name?', 
                style: Theme.of(context).textTheme.titleLarge
              ),
              _nameInput(),
              const SizedBox(height: 8),
              Text(
                'This appears on your profile ', 
                style: Theme.of(context).textTheme.bodySmall
              ),
            ],        
          ),
          const SizedBox(height: 20),
          _forwardBtn(),
        ],
      )
    );
  }

  Widget _nameInput() {
    return Form(
      key: ref.read(signUpViewModel).nameFormKey,
      child: TextFormField(
        keyboardType: TextInputType.emailAddress,
        validator: emptyValidator,
        controller: ref.read(signUpViewModel).nameController,
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
    return  ForwardButton(
      onPressed: () {
        if (ref.read(signUpViewModel).nameFormKey.currentState!.validate()) {
          context.push('/auth/sign-up/step-5');
        }
      },
    );
  }
}