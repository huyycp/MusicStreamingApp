import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/modal_bottom_sheet.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/forward_button.dart';
import 'package:mobile/views/sign_up/widgets/gender_item.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/views/sign_up/widgets/sign_up_app_bar.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class SignUpStepGenderView extends ConsumerStatefulWidget {
  const SignUpStepGenderView({super.key});

  @override
  ConsumerState<SignUpStepGenderView> createState() => _SignUpStepGenderState();
}

class _SignUpStepGenderState extends ConsumerState<SignUpStepGenderView> {
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
            child: DynamicImage(AppConstantIcons.chevronDown, width: 20, height: 20),
          ),
          suffixIconConstraints: const BoxConstraints(maxHeight: 24, maxWidth: 24, minHeight: 24, minWidth: 24),
        ),
        onTap: genderOnTap,
      ),
    );
  }

  void genderOnTap() => showAppModalBottomSheet(
    context: context, 
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
          context.push(RouteNamed.signUpStepRole);
        }
      },
    );
  }
}