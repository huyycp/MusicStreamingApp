import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/theme/text_theme.dart';
import 'package:mobile/utils/constants.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/views/auth_methods/auth_methods_view_model.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/widgets/base_container.dart';

class AuthMethodsView extends ConsumerStatefulWidget {
  const AuthMethodsView({super.key});

  @override
  ConsumerState<AuthMethodsView> createState() => _AuthMethodsViewState();
}

class _AuthMethodsViewState extends ConsumerState<AuthMethodsView> {
  @override
  Widget build(BuildContext context) {
    const gap = SizedBox(height: 4);
    return Scaffold(
      body: BaseContainer(
        padding: const EdgeInsets.symmetric(horizontal: 46, vertical: 54),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Center(
                child: Text(
                  APP_NAME, 
                  style: Theme.of(context).textTheme.displaySmall
                )
              ),
            ),
            gap,
            _signUpBtn(),
            gap,
            _googleBtn(),
            gap,
            _facebookBtn(),
            gap,
            _loginBtn(),
          ],
        )
      )
    );
  }

  Widget _signUpBtn() {
    return ElevatedButton(
      onPressed: () {
        context.push(RouteNamed.signUpStepEmail);
      }, 
      style: ElevatedButton.styleFrom(
        backgroundColor: PRIMARY_COLOR,
        foregroundColor: PRIMARY_BACKGROUND,
        padding: const EdgeInsets.all(8)
      ),
      child: Text(
        'Sign up free',
        style: BaseTextTheme.LABEL_BUTTON,
      ),
    );
  }

  Widget _googleBtn() {
    return OutlinedButton.icon(
      onPressed: () {
        ref.watch(signUpViewModel);
        ref.read(authMethodsViewModel).loginWithGoogle((account) async {
          if (account != null) {
            if (await ref.read(userRepoProvider).checkExistEmail(account.email)) {
              final result = await ref.read(userRepoProvider).loginWithEmail(
                email: account.email,
                password: account.id,
                type: AppAuthType.oauth,
              );
              if (result) {
                context.go(RouteNamed.main);
              } else {
                SnackBarUtils.showSnackBar(message: 'Email already exists');
              }
            } else {
              ref.read(signUpViewModel).setGoogleAccount(account);
              context.push(RouteNamed.signUpStepGender);
            }
          }
        });
      }, 
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: const BorderSide(
          color: Colors.white
        ),
        padding: const EdgeInsets.all(8)

      ),
      label: Text(
        'Continue with google',
        textAlign: TextAlign.center,
        style: BaseTextTheme.LABEL_BUTTON,
      ),
      icon: SvgPicture.asset(AppConstantIcons.google),
    );
  }

  Widget _facebookBtn() {
    return OutlinedButton.icon(
      onPressed: ref.read(authMethodsViewModel).loginWithFacebook, 
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: const BorderSide(
          color: Colors.white
        ),
        padding: const EdgeInsets.all(8)
      ),
      label: Text(
        'Continue with Facebook', 
        textAlign: TextAlign.center,
        style: BaseTextTheme.LABEL_BUTTON,
      ),
      icon: SvgPicture.asset(AppConstantIcons.facebook),
    );
  }

  Widget _loginBtn() {
    return TextButton(
      onPressed: () {
        context.push(RouteNamed.login);
      }, 
      style: TextButton.styleFrom(
        foregroundColor: Colors.white,
      ),
      child:  Text(
        'Log in',
        style: BaseTextTheme.LABEL_BUTTON,
      ),
    );
  }
}