import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
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
              const Text('What\'s your email?', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
              _emailInput(),
              const SizedBox(height: 8),
              const Text('You\'ll need to confirm this email later. ', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w400),),
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
            context.push('/auth/sign-up/step-2');
          }
        }
        : null,  
    );
  }
}