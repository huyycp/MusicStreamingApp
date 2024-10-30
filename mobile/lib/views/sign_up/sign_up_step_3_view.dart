import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/views/sign_up/widgets/gender_item.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/views/sign_up/widgets/sign_up_app_bar.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class SignUpStep3View extends ConsumerStatefulWidget {
  const SignUpStep3View({super.key});

  @override
  ConsumerState<SignUpStep3View> createState() => _SignUpStep3State();
}

class _SignUpStep3State extends ConsumerState<SignUpStep3View> {
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
                'What\'s your gender?', 
                style: Theme.of(context).textTheme.titleLarge
              ),
              _genderInput(),
            ],        
          ),
          const SizedBox(height: 20),
          _forwardBtn(),
        ],
      )
    );
  }

  Widget _genderInput() {
    return Form(
      key: ref.read(signUpViewModel).genderFormKey,
      child: TextFormField(
        readOnly: true,
        showCursor: false,      
        canRequestFocus: false,
        controller: ref.read(signUpViewModel).genderController,
        validator: emptyValidator,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(5),
            borderSide: BorderSide.none
          ),
          fillColor: INPUT_FILL_COLOR,
          filled: true,
          suffixIcon: Padding(
            padding: const EdgeInsets.only(right: 8),
            child: DynamicImage('assets/icons/ic_chevron_down.svg', width: 20, height: 20),
          ),
          suffixIconConstraints: const BoxConstraints(maxHeight: 24, maxWidth: 24, minHeight: 24, minWidth: 24),
        ),
        onTap: genderOnTap,
      ),
    );
  }

  void genderOnTap() => showModalBottomSheet(
    context: context, 
    enableDrag: true,
    useSafeArea: true,
    showDragHandle: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12))
    ),
    builder: (context) => Container(
      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 20),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          GenderItem('Male'),
          SizedBox(height: 8),
          GenderItem('Female'),
        ],
      ),
    )
  );

  Widget _forwardBtn() {
    return ForwardButton(
      onPressed: () {
        if (ref.read(signUpViewModel).genderFormKey.currentState!.validate()) {
          context.push('/auth/sign-up/step-4');
        }
      },
    );
  }
}