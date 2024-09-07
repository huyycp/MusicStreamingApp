import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/dto/register_dto.dart';
import 'package:mobile/utils/capitalize.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/widgets/base_container.dart';

class SignUpStep5View extends ConsumerStatefulWidget {
  const SignUpStep5View({super.key});

  @override
  ConsumerState<SignUpStep5View> createState() => _SignUpStep5State();
}

class _SignUpStep5State extends ConsumerState<SignUpStep5View> {
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('You are ...?', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
          _roleSelect(),
          const SizedBox(height: 20),
          _forwardBtn(),
        ],        
      )
    );
  }

  Widget _roleSelect() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: UserRole.values.map((value) => RadioListTile<UserRole>(
        title: Text(capitalize(value.name)),
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