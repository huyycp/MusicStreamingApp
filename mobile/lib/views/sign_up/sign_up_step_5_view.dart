import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/dto/req/register_req.dart';
import 'package:mobile/utils/capitalize.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/views/sign_up/widgets/sign_up_app_bar.dart';

class SignUpStep5View extends ConsumerStatefulWidget {
  const SignUpStep5View({super.key});

  @override
  ConsumerState<SignUpStep5View> createState() => _SignUpStep5State();
}

class _SignUpStep5State extends ConsumerState<SignUpStep5View> {
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
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'You are ...?', 
                  style: Theme.of(context).textTheme.titleLarge
                ),
                _roleSelect(),
              ],        
            ),
          ),
          _forwardBtn(),
        ],
      )
    );
  }

  Widget _roleSelect() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: UserRole.values.map((value) => RadioListTile<UserRole>(
        title: Text(
          capitalize(value.name),
          style: Theme.of(context).textTheme.bodyLarge
        ),
        value: value,
        activeColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8)
        ),    
        groupValue: ref.watch(signUpViewModel).userRole,
        onChanged: ref.read(signUpViewModel).changeUserRole,
      )).toList(),
    );
  }

  Widget _forwardBtn() {
    return  ForwardButton(
      onPressed: () {
        debugPrint(ref.read(signUpViewModel).emailController.text);
        debugPrint(ref.read(signUpViewModel).passwordController.text);
        debugPrint(ref.read(signUpViewModel).genderController.text);
        debugPrint(ref.read(signUpViewModel).nameController.text);
        debugPrint(ref.read(signUpViewModel).userRole.name);
        context.push('/auth/verify-email');
      },
    );
  }
}