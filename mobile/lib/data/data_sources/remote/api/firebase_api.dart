import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final firebaseApi = Provider<FirebaseApi>(
  (ref) => FirebaseApi()
);

class FirebaseApi {
  FirebaseApi._();

  static final FirebaseApi _instance = FirebaseApi._();

  factory FirebaseApi() {
    return _instance;
  }

  late final FirebaseApp app;
  late final FirebaseAuth auth;

  Future<void> initApi() async {
    app = await Firebase.initializeApp();
    auth = FirebaseAuth.instanceFor(app: app);
  }

  Future<UserCredential> signInWithCredential(AuthCredential cred) async {
    return await auth.signInWithCredential(cred);
  }
}