import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/magic_music_api.dart';
import 'package:mobile/data/dto/login_dto.dart';
import 'package:mobile/data/dto/register_dto.dart';

final userRemoteProvider = Provider<UserRemoteDataSource>(
  (ref) => UserRemoteDataSource(ref.read(magicMusicApiProvider))
);

class UserRemoteDataSource {
  UserRemoteDataSource(MagicMusicApi magicMusicApi) {
    _magicMusicApi = magicMusicApi;
  }

  late MagicMusicApi _magicMusicApi;
  final String _registerPath = '/auth/register';
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
      _magicMusicApi.setAccessToken(accessToken);
      return true;
    } else {
      return false;
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