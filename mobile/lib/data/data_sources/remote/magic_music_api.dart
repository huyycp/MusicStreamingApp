import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/base_api.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/snackbar.dart';

final magicMusicApiProvider = Provider<MagicMusicApi>(
  (ref) => MagicMusicApi(dotenv.env['MAGIC_MUSIC_URL']!)
);

class MagicMusicApi extends BaseApi {
  MagicMusicApi(String url) {
    baseUrl = url;
  }

  @override
  Future<({String? accessToken, String? refreshToken})> refreshToken() async {
    try {
      Dio tempDio = Dio();
      final response = await tempDio.post(
        '$baseUrl/auth/refresh-token',
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
    } catch (err) {
      token = null;
      await removeAccessToken();
      await removeRefreshToken();
      SnackBarUtils.showSnackBar(message: 'Session expired. Please log in!');
      RouteConfig.instance.go('/auth');
      return (accessToken: null, refreshToken: null);
    }
  }

  /// Handle requests
  Future<Response> request(
    String path, {
    required HttpMethods method,
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    final response = await dio.request(
      path, 
      data: data,
      queryParameters: queryParameters,
      options: (options?..method=method.name) ?? Options(method: method.name),
      cancelToken: cancelToken,
    );
    return response;
  }
}

enum HttpMethods {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE
}