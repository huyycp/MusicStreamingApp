import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/views/sign_up/widgets/gender_item.dart';

class SignUpStep3 extends ConsumerStatefulWidget {
  const SignUpStep3({super.key});

  @override
  ConsumerState<SignUpStep3> createState() => _SignUpStep3State();
}

class _SignUpStep3State extends ConsumerState<SignUpStep3> {
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
              const Text('What\'s your gender?', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
              _genderInput(),
              const SizedBox(height: 20),
            ],        
          ),
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
            child: SvgPicture.asset('assets/icons/ic_chevron_down.svg'),
          ),
          suffixIconConstraints: BoxConstraints(maxHeight: 24, maxWidth: 24, minHeight: 24, minWidth: 24),
        ),
        onTap: () {
          showModalBottomSheet(
            context: context, 
            builder: (context) => Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12))
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  GenderItem('Male'),
                  GenderItem('Female'),
                ],
              ),
            )
          );
        },
      ),
    );
  }

  Widget _forwardBtn() {
    return  ElevatedButton(
      onPressed: () {
        if (ref.read(signUpViewModel).genderFormKey.currentState!.validate()) {
          context.push('/sign-up/step-4');
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