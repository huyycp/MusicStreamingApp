import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/widgets/base_container.dart';

class SignUpStep4View extends ConsumerStatefulWidget {
  const SignUpStep4View({super.key});

  @override
  ConsumerState<SignUpStep4View> createState() => _SignUpStep4State();
}

class _SignUpStep4State extends ConsumerState<SignUpStep4View> {
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
              const Text('What\'s your name?', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
              _nameInput(),
              const SizedBox(height: 8),
              const Text('This appears on your profile ', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w400),),
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
        context.push('/auth/sign-up/step-5');
      },
    );
  }
}