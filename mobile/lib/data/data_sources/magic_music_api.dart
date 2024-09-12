import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/base_api.dart';

final magicMusicApiProvider = Provider<MagicMusicApi>(
  (ref) => MagicMusicApi(dotenv.env['MAGIC_MUSIC_BASE_URL']!)
);

class MagicMusicApi extends BaseApi {
  MagicMusicApi(String baseUrl) {
    dio.options.baseUrl = baseUrl;
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
    } catch (e) {
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