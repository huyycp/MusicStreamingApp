import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/magic_music_api.dart';
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

  Future<bool> registerWithEmail(RegisterDto dto) async {
    final response = await _magicMusicApi.request(
      _registerPath, 
      method: HttpMethod.POST,
      data: dto.toJson()
    );
    
    if (response.statusCode == HttpStatus.created) {
      final data = response.data;
      final accessToken = data['result']['access_token'] ?? '';
      final refreshToken = data['result']['refresh_token'] ?? '';
      _magicMusicApi.setAccessToken(accessToken);
      _magicMusicApi.setRefreshToken(refreshToken);
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
      _magicMusicApi.setAccessToken(accessToken);
      return true;
    } else {
      return false;
    }
  }
}