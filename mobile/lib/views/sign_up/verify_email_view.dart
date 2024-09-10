import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:otp_pin_field/otp_pin_field.dart';

class VerifyEmailView extends ConsumerStatefulWidget {
  const VerifyEmailView({super.key});

  @override
  ConsumerState<VerifyEmailView> createState() => _VerifyEmailViewState();
}

class _VerifyEmailViewState extends ConsumerState<VerifyEmailView> {
  @override
  void initState() {
    super.initState();
    ref.read(signUpViewModel).getAuthOTP();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(signUpViewModel.select((value) => value.registerSuccess), (prev, next) {
      debugPrint('Register status: ${next}');
      context.pop();
      if (next) {
        context.go('/main');
      } else {
        debugPrint('Register failed');
      }
    });

    ref.listen(signUpViewModel.select((value) => value.verifySuccess), (prev, next) {
      debugPrint('Verify status: $next');
      context.pop();
      if (next) {
        showDialog(
          context: context, 
          barrierDismissible: false,
          builder: (context) {
            return _statusDialog('Registering...');
          });
        ref.read(signUpViewModel).registerWithEmail();
      } else {
        debugPrint('Verify email failed');
      }
    });

    return PopScope(
      onPopInvokedWithResult: (_, __) => ref.read(signUpViewModel).clear(),
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Verify email'),
      centerTitle: true,
    );
  }

  Widget _body() {
    return BaseContainer(
      padding: const EdgeInsets.all(30),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('Enter OTP pin', style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          _otpInput(),
          const SizedBox(height: 20),
          _resendBtn(),
        ],
      ),
    );
  }

  Widget _otpInput() {
    return OtpPinField(
      cursorColor: Colors.white,
      maxLength: 6,
      fieldHeight: 50,
      fieldWidth: 0.1 * MediaQuery.sizeOf(context).width,
      otpPinFieldStyle: OtpPinFieldStyle(
        textStyle: TextStyle(
          color: Colors.white,
          fontSize: 30,
        ),
        defaultFieldBorderColor: Colors.white,
        activeFieldBorderColor: Colors.white,
        filledFieldBorderColor: Colors.white
      ),
      onSubmit: _verifyEmail, 
      onChange: (value) {}
    );
  }

  Widget _resendBtn() {
    return ElevatedButton(
      onPressed: ref.read(signUpViewModel).getAuthOTP,
      style: ElevatedButton.styleFrom(
        fixedSize: Size(150, 40),
        padding: EdgeInsets.zero,
        foregroundColor: Colors.grey[800],
        backgroundColor: Colors.grey[600],
      ),
      child: const Text('Resend OTP'),
    );
  }

  void _verifyEmail(String otp) {
    ref.read(signUpViewModel).verifyEmail(otp);
    showDialog(
      context: context, 
      barrierDismissible: false,
      builder: (context) {
      return _statusDialog('Verifying email...');
    });
  }

  Widget _statusDialog(String message) {
    return Dialog(
      insetPadding: const EdgeInsets.all(30),
      backgroundColor: PRIMARY_BACKGROUND,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(color: Colors.white)
      ),
      child: Container(
        width: 0.8 * MediaQuery.sizeOf(context).width,
        height: 200,
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(color: Colors.white),
              const SizedBox(height: 10),
              Text(message),
            ],
          ),
        ),
      ),
    );
  }
}