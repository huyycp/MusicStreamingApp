import 'dart:io';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/firebase_api.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';
import 'package:mobile/data/dto/req/edit_profile_req.dart';
import 'package:mobile/data/dto/req/get_artist_req.dart';
import 'package:mobile/data/dto/req/login_req.dart';
import 'package:mobile/data/dto/req/register_req.dart';
import 'package:mobile/data/dto/req/verify_email_req.dart';
import 'package:mobile/data/dto/resp/get_artist_resp.dart';
import 'package:mobile/models/user_model.dart';

final userRemoteProvider = Provider<UserRemoteDataSource>(
  (ref) => UserRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider),
    firebaseApi: ref.read(firebaseApi),
  )
);

class UserRemoteDataSource {
  UserRemoteDataSource({
    required MagicMusicApi magicMusicApi,
    required FirebaseApi firebaseApi,
  }) {
    _magicMusicApi = magicMusicApi;
    _firebaseApi = firebaseApi;
  }

  late final MagicMusicApi _magicMusicApi;
  late final FirebaseApi _firebaseApi;

  final String _registerPath = '/auth/register';
  final String _getOtpPath = '/auth/get-otp-verify';
  final String _verifyEmailPath = '/auth/verify-email';
  final String _getAvailableEmailsPath = '/auth/get-list-email';
  final String _loginPath = '/auth/login';
  final String _logoutPath = '/auth/logout';
  final String _userPath = '/users';

  Future<void> init() async {
    await _firebaseApi.initApi();
  }

  Future<bool> registerWithEmail(RegisterReq dto) async {
    final response = await _magicMusicApi.request(
      _registerPath, 
      method: HttpMethods.POST,
      data: dto.toJson()
    );
    
    if (response.statusCode == HttpStatus.created) {
      final data = response.data;
      final accessToken = data['result']['access_token']?.toString() ;
      final refreshToken = data['result']['refresh_token']?.toString();
      await _magicMusicApi.setAccessToken(accessToken);
      await _magicMusicApi.setRefreshToken(refreshToken);
      _magicMusicApi.token = accessToken;
      return true;
    } else {
      return false;
    }
  }

  Future<void> getAuthOTP(String email) async {
    await _magicMusicApi.request(
      _getOtpPath,
      method: HttpMethods.POST,
      data: {
        'email': email
      }
    );
  }

  Future<bool> verifyEmail(VerifyEmailReq dto) async {
    final response = await _magicMusicApi.request(
      _verifyEmailPath,
      method: HttpMethods.POST,
      data: dto.toJson()
    );
    return response.statusCode == HttpStatus.ok;
  }

  Future<List<String>> getAvailableEmails() async {
    final response = await _magicMusicApi.request(
      _getAvailableEmailsPath,
      method: HttpMethods.GET
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data;
      return List.from(
        data['result']?.map(
          (json) => json.toString()
        ) ?? []);
    } else {
      return List.empty();
    }
  }
    
  Future<bool> loginWithEmail(LoginReq dto) async {
    final response = await _magicMusicApi.request(
      _loginPath, 
      method: HttpMethods.POST,
      data: dto.toJson()
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data;
      final accessToken = data['result']['access_token'] ?? '';
      final refreshToken = data['result']['refresh_token'] ?? '';
      await _magicMusicApi.setAccessToken(accessToken);
      await _magicMusicApi.setRefreshToken(refreshToken);
      _magicMusicApi.token = accessToken;
      return true;
    } else {
      return false;
    }
  }

  Future<UserCredential> loginWithGoogle(AuthCredential cred) async {
    return await _firebaseApi.signInWithCredential(cred);
  }

  Future<bool> logout() async {
    final response = await _magicMusicApi.request(
      _logoutPath,
      method: HttpMethods.POST,
      options: Options(
        headers: {
          HttpHeaders.userAgentHeader: 'mobile ${await _magicMusicApi.getRefreshToken()}'
        }
      )
    );
    if (response.statusCode == HttpStatus.ok) {
      await _magicMusicApi.removeAccessToken();
      await _magicMusicApi.removeRefreshToken();
      _magicMusicApi.token = null;
      return true;
    } else {
      return false;
    }
  }

  Future<bool> loadAccessToken() async {
    final accessToken = await _magicMusicApi.getAccessToken();
    debugPrint('Access token: $accessToken');
    _magicMusicApi.token = accessToken;
    return accessToken != null;
  }

  Future<String?> getRefreshToken() async {
    return await _magicMusicApi.getRefreshToken();
  }

  Future<UserModel?> getCurrentUser() async {
    final response = await _magicMusicApi.request(
      '$_userPath/me',
      method: HttpMethods.GET,
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return UserModel.fromJson(data);
      }
    }
    return null;
  }

  Future<UserModel?> getUser(String userId) async {
    final response = await _magicMusicApi.request(
      '$_userPath/$userId',
      method: HttpMethods.GET,
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return UserModel.fromJson(data);
      }
    }
    return null;
  }

  Future<UserModel?> editProfile(EditProfileReq req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      '$_userPath/me',
      method: HttpMethods.PATCH,
      data: data,
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return UserModel.fromJson(data);
      }
    }
    return null;
  }

  Future<bool> followUser(String userId, {bool follow = true}) async {
    final response = await _magicMusicApi.request(
      '$_userPath/follow/$userId',
      method: follow ? HttpMethods.POST : HttpMethods.DELETE
    );
    return response.statusCode == HttpStatus.ok;
  }

  Future<bool> checkFollow(String userId) async {
    final response = await _magicMusicApi.request(
      '$_userPath/follow/$userId',
      method: HttpMethods.GET,
    );
    if (response.statusCode == HttpStatus.ok) {
      return response.data['result'] ?? false;
    }
    return false;
  }

  Future<GetArtistResp?> getFollowingArtists(GetArtistReq req) async {
    final response = await _magicMusicApi.request(
      '$_userPath/follow',
      method: HttpMethods.GET,
      data: req.toJson(),
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return GetArtistResp.fromJson(data);
      }
    }
    return null;
  }
}