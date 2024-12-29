import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/base_api.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';

final audioRecognizerProvider = Provider<AudioRecognizerApi>(
  (ref) => AudioRecognizerApi(dotenv.env['AUDIO_RECOGNIZER_URL']!)
);

class AudioRecognizerApi extends BaseApi{
  AudioRecognizerApi(String url) {
    baseUrl = url;
  }
  
  @override
  Future<({String? accessToken, String? refreshToken})> refreshToken() async {
    return (accessToken: null, refreshToken: null);
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