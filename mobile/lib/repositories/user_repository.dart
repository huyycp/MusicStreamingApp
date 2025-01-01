import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:image_picker/image_picker.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:mobile/data/data_sources/remote/user_remote_data_source.dart';
import 'package:mobile/data/dto/req/edit_profile_req.dart';
import 'package:mobile/data/dto/req/get_artist_req.dart';
import 'package:mobile/data/dto/req/login_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/req/register_req.dart';
import 'package:mobile/data/dto/req/verify_email_req.dart';
import 'package:mobile/data/dto/resp/get_artist_resp.dart';
import 'package:mobile/models/user_model.dart';

final userRepoProvider = ChangeNotifierProvider<UserRepository>(
  (ref) => UserRepository(
    ref.read(userRemoteProvider)
  )
);

class UserRepository extends ChangeNotifier {
  UserRepository(UserRemoteDataSource userRemote) {
    _userRemote = userRemote;
  }
  
  late final UserRemoteDataSource _userRemote;
  UserModel? user;

  Future<void> initFirebase() async {
    await _userRemote.init();
  }

  Future<bool> registerWithEmail({
    required String email,
    required String password,
    required String gender, 
    required String name, 
    required UserRole role, 
    String? avatar,
  }) async {
    final result = await _userRemote.registerWithEmail(RegisterReq(
      email: email, 
      password: password, 
      gender: gender, 
      name: name, 
      role: role,
      avatar: avatar,
      authType: AppAuthType.oauth,
    ));
    if (result) {
       await getCurrentUser();
    }
    return result;
  }

  Future<void> getAuthOTP(String email) async {
    await _userRemote.getAuthOTP(email);
  } 

  Future<bool> verifyEmail({
    required String email,
    required String otp,
  }) {
    return _userRemote.verifyEmail(VerifyEmailReq(
      email: email, 
      otp: otp
    ));
  }

  Future<List<String>> getAvailableEmails() async {
    return await _userRemote.getAvailableEmails();
  }

  Future<bool> loginWithEmail({
    required String email,
    required String password,
    AppAuthType type = AppAuthType.inapp,
  }) async {
    final result = await _userRemote.loginWithEmail(LoginReq(
      email: email,
      password: password,
      authType: type,
    ));
    if (result) {
       await getCurrentUser();
    }
    return result;
  }

  Future<bool> loginWithGoogle({
    required AuthCredential authCred,
    required String gender,
    required UserRole role,
  }) async {
    final userCred = await _userRemote.loginWithGoogle(authCred);
    if (userCred.user == null) return false; 
    final req = RegisterReq(
      email: userCred.user!.email ?? '',
      password: userCred.user!.uid,
      name: userCred.user!.displayName ?? 'User#${DateTime.now().millisecondsSinceEpoch % 10000}',
      gender: gender,
      role: role,
      authType: AppAuthType.oauth,
    );
    final result = await _userRemote.registerWithEmail(req);
    if (result) {
      await getCurrentUser();
    }
    return result;
  }

  Future<bool> logout() async {
    user = null;
    return await _userRemote.logout();
  }

  Future<bool> loadAccessToken() async {
    return await _userRemote.loadAccessToken();
  }

  Future<bool> isValidRefreshToken() async {
    final refreshToken = await _userRemote.getRefreshToken();
    if (refreshToken == null) return false;
    return !JwtDecoder.isExpired(refreshToken);
  }

  Future<void> getCurrentUser() async {
    try {
      user = await _userRemote.getCurrentUser();
      notifyListeners();
    } catch (err) {
      user = null;
    }
  }

  Future<UserModel?> getUser(String userId) async {
    return await _userRemote.getUser(userId);
  }

  Future<UserModel?> editProfile({
    String? name,
    String? gender,
    XFile? image,
  }) async {
    final req = EditProfileReq(
      name: name,
      gender: gender,
      image: image,
    );
    return await _userRemote.editProfile(req);
  }

  Future<bool> followUser(String userId) async {
    return await _userRemote.followUser(userId, follow: true);
  }

  Future<bool> unfollowUser(String userId) async {
    return await _userRemote.followUser(userId, follow: false);
  }

  Future<bool> checkFollow(String userId) async {
    return await _userRemote.checkFollow(userId);
  }

  Future<GetArtistResp?> getFollowingArtists({
    required PaginationListReq pagination
  }) async {
    final req = GetArtistReq(pagination: pagination);
    return await _userRemote.getFollowingArtists(req);
  }

  Future<UserCredential> addToFirebase(GoogleSignInAccount account) async {
    final GoogleSignInAuthentication accountAuth = await account.authentication; 
    
    final AuthCredential cred = GoogleAuthProvider.credential(
      idToken: accountAuth.idToken,
      accessToken: accountAuth.accessToken,
    );

    return await _userRemote.addToFirebase(cred);
  }

  Future<bool> checkExistEmail(String email) async {
    return await _userRemote.checkExistEmail(email);
  }

  Future<bool> checkUploadLimit() async {
    return await _userRemote.checkUploadLimit();
  }
}