import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/base_api.dart';

final magicMusicApiProvider = Provider<MagicMusicApi>(
  (ref) => MagicMusicApi(dotenv.env['MAGIC_MUSIC_BASE_URL']!)
);

class MagicMusicApi extends BaseApi {
  MagicMusicApi(String url) {
    baseUrl = url;
  }

  @override
  Future<({String? accessToken, String? refreshToken})> refreshToken() async {
    Dio tempDio = Dio();
    final response = await tempDio.post(
      '${dotenv.env['MAGIC_MUSIC_BASE_URL']}/auth/refresh-token',
      data: {
        'refresh_token': await getRefreshToken()
      }
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data;
      final accessToken = data['result']['access_token']?.toString();
      final refreshToken = data['result']['refresh_token']?.toString();
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      debugPrint('Refresh token: {access_token: $accessToken, refresh_token: $refreshToken}');
      return (accessToken: accessToken, refreshToken: refreshToken);
    } else {
      return (accessToken: null, refreshToken: null);
    }
  }

  /// Handle requests
  Future<Response> request(
    String path, {
    required HttpMethod method,
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await dio.request(
        path, 
        data: data,
        queryParameters: queryParameters,
        options: (options?..method=method.name) ?? Options(method: method.name),
        cancelToken: cancelToken,
      );
      return response;
    } catch(err) {
      rethrow;
    }
  }
}

enum HttpMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE
}