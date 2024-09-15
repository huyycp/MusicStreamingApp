import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/login_dto.dart';
import 'package:mobile/data/dto/register_dto.dart';
import 'package:mobile/data/dto/verify_email_dto.dart';

final userRemoteProvider = Provider<UserRemoteDataSource>(
  (ref) => UserRemoteDataSource(ref.read(magicMusicApiProvider))
);

class UserRemoteDataSource {
  UserRemoteDataSource(MagicMusicApi magicMusicApi) {
    _magicMusicApi = magicMusicApi;
  }

  late MagicMusicApi _magicMusicApi;
  final String _registerPath = '/auth/register';
  final String _getOtpPath = '/auth/get-otp-verify';
  final String _verifyEmailPath = '/auth/verify-email';
  final String _getAvailableEmailsPath = '/auth/get-list-email';
  final String _loginPath = '/auth/login';
  final String _logoutPath = '/auth/logout';

  Future<bool> registerWithEmail(RegisterDto dto) async {
    final response = await _magicMusicApi.request(
      _registerPath, 
      method: HttpMethod.POST,
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
      method: HttpMethod.POST,
      data: {
        'email': email
      }
    );
  }

  Future<bool> verifyEmail(VerifyEmailDto dto) async {
    final response = await _magicMusicApi.request(
      _verifyEmailPath,
      method: HttpMethod.POST,
      data: dto.toJson()
    );
    return response.statusCode == HttpStatus.ok;
  }

  Future<List<String>> getAvailableEmails() async {
    final response = await _magicMusicApi.request(
      _getAvailableEmailsPath,
      method: HttpMethod.GET
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
    
  Future<bool> loginWithEmail(LoginDto dto) async {
    final response = await _magicMusicApi.request(
      _loginPath, 
      method: HttpMethod.POST,
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

  Future<bool> logout() async {
    final response = await _magicMusicApi.request(
      _logoutPath,
      method: HttpMethod.POST,
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
}