import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/auth_methods/auth_methods_view_model.dart';

class AuthMethodsView extends ConsumerStatefulWidget {
  const AuthMethodsView({super.key});

  @override
  ConsumerState<AuthMethodsView> createState() => _AuthMethodsViewState();
}

class _AuthMethodsViewState extends ConsumerState<AuthMethodsView> {
  @override
  Widget build(BuildContext context) {
    final gap = const SizedBox(height: 4);
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 46, vertical: 54),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Center(child: Text('Chill Tunes', style: TextStyle(fontSize: 32))),
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
        context.push('/sign-up/step-1');
      }, 
      style: ElevatedButton.styleFrom(
        backgroundColor: PRIMARY_COLOR,
        foregroundColor: PRIMARY_BACKGROUND,
        padding: const EdgeInsets.all(8)
      ),
      child: const Text(
        'Sign up free',
        style: TextStyle(
          fontSize: 16
        ),
      ),
    );
  }

  Widget _googleBtn() {
    return OutlinedButton.icon(
      onPressed: ref.read(authMethodsViewModel).loginWithGoogle, 
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: BorderSide(
          color: Colors.white
        ),
        padding: const EdgeInsets.all(8)

      ),
      label: const Text(
        'Continue with google',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 16,
        ),
      ),
      icon: SvgPicture.asset('assets/icons/ic_google.svg'),
    );
  }

  Widget _facebookBtn() {
    return OutlinedButton.icon(
      onPressed: ref.read(authMethodsViewModel).loginWithFacebook, 
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: BorderSide(
          color: Colors.white
        ),
        padding: const EdgeInsets.all(8)
      ),
      label: const Text(
        'Continue with Facebook', 
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 16
        ),
      ),
      icon: SvgPicture.asset('assets/icons/ic_facebook.svg'),
    );
  }

  Widget _loginBtn() {
    return TextButton(
      onPressed: () {}, 
      style: TextButton.styleFrom(
        foregroundColor: Colors.white,
      ),
      child: const Text(
        'Log in',
        style: TextStyle(
          fontSize: 16
        ),
      ),
    );
  }
}