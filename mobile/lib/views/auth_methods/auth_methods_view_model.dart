import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';

final authMethodsViewModel = ChangeNotifierProvider.autoDispose<AuthMethodsViewModel>(
  (ref) => AuthMethodsViewModel()
);

class AuthMethodsViewModel extends ChangeNotifier{

  Future<void> loginWithGoogle(Function(bool) onDone) async {
    final googleSignIn = GoogleSignIn();

    final GoogleSignInAccount? googleAccount = await googleSignIn.signIn();
    
    final GoogleSignInAuthentication? accountAuth = await googleAccount?.authentication; 
    
    if (accountAuth != null) {
      debugPrint('Account : ${accountAuth.idToken}');
    }
    onDone(accountAuth != null);
  }
  
  void loginWithFacebook() {

  }

}