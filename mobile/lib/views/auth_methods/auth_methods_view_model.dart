import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';

final authMethodsViewModel = ChangeNotifierProvider.autoDispose<AuthMethodsViewModel>(
  (ref) => AuthMethodsViewModel()
);

class AuthMethodsViewModel extends ChangeNotifier{

  Future<void> loginWithGoogle(Function(GoogleSignInAccount?) onDone) async {
    try {
      final googleSignIn = GoogleSignIn(
        scopes: [
          'email',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ]
      );

      final GoogleSignInAccount? googleAccount = await googleSignIn.signIn();
      debugPrint('Google account $googleAccount');    
      // final GoogleSignInAuthentication? accountAuth = await googleAccount?.authentication; 
      
      // final AuthCredential cred = GoogleAuthProvider.credential(
      //   idToken: accountAuth?.idToken,
      //   accessToken: accountAuth?.accessToken,
      // );

      // debugPrint('Account : $cred');
      
      onDone(googleAccount);
    } catch (err) {
      debugPrint(err.toString());
    }
  }
  
  void loginWithFacebook() {

  }

}