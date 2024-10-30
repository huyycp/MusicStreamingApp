import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:mobile/data/data_sources/remote/user_remote_data_source.dart';
import 'package:mobile/data/dto/req/login_req.dart';
import 'package:mobile/data/dto/req/register_req.dart';
import 'package:mobile/data/dto/req/verify_email_req.dart';

final userRepoProvider = Provider<UserRepository>(
  (ref) => UserRepository(
    ref.read(userRemoteProvider)
  )
);

class UserRepository {
  UserRepository(UserRemoteDataSource userRemote) {
    _userRemote = userRemote;
  }
  
  late final UserRemoteDataSource _userRemote;

  Future<bool> registerWithEmail({
    required String email,
    required String password,
    required String gender, 
    required String name, 
    required UserRole role, 
  }) async {
    return await _userRemote.registerWithEmail(RegisterReq(
      email: email, 
      password: password, 
      gender: gender, 
      name: name, 
      role: role
    ));
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
    required String password
  }) async {
    return await _userRemote.loginWithEmail(LoginReq(
      email: email,
      password: password
    ));
  }

  Future<bool> logout() async {
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
}