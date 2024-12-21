import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/views/sign_up/widgets/sign_up_app_bar.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:string_validator/string_validator.dart';

class SignUpStep1View extends ConsumerStatefulWidget {
  const SignUpStep1View({super.key});

  @override
  ConsumerState<SignUpStep1View> createState() => _SignUpStep1State();
}

class _SignUpStep1State extends ConsumerState<SignUpStep1View> {
  @override
  void initState() {
    super.initState();
    ref.read(signUpViewModel).getAvailableEmails();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvokedWithResult: (_, __) => ref.read(signUpViewModel).clear(),
      child: Scaffold(
        appBar: SignUpAppBar(text: 'Create account', context: context),
        body: _body(),
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
              Text(
                'What\'s your email?', 
                style: Theme.of(context).textTheme.titleLarge
              ),
              _emailInput(),
              const SizedBox(height: 8),
              Text(
                'You\'ll need to confirm this email later. ', 
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

  Widget _emailInput() {
    return Form(
      key: ref.read(signUpViewModel).emailFormKey,
      child: TextFormField(
        validator: (value) {
          if (value == null || !isEmail(value)) {
            return 'Please check your email again';
          }
          if (ref.watch(signUpViewModel.select((value) => value.availableEmails)).contains(value)) {
            return 'Email has already existed';
          }
          return null;
        },
        keyboardType: TextInputType.emailAddress,
        controller: ref.read(signUpViewModel).emailController,
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
    return ForwardButton(
      onPressed: ref.watch(signUpViewModel.select((value) => value.availableEmails)) != ['']
        ? () {
          if (ref.read(signUpViewModel).emailFormKey.currentState!.validate()) {
            context.push(RouteNamed.signUpStep2);
          }
        }
        : null,  
    );
  }
}