import 'package:dio/dio.dart';
import 'package:encrypt/encrypt.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class BaseApi {
  BaseApi() {
    dio = Dio(
      BaseOptions(
        connectTimeout: connectTimeOut,
        sendTimeout: sendTimeOut,
        receiveTimeout: receiveTimeOut,
      ) 
    );

    dio.interceptors.add(QueuedInterceptorsWrapper(
      onRequest: onRequest,
      onResponse: onResponse,
      onError: onError
    ));
    encrypter = Encrypter(AES(key));
    
  }

  late Dio dio;
  late Encrypter encrypter;
  final key = Key.fromUtf8(dotenv.env['ENCRYPT_KEY']!);
  final iv = IV.fromLength(16);
  final connectTimeOut = Duration(milliseconds: 3000);
  final sendTimeOut = Duration(milliseconds: 3000);
  final receiveTimeOut = Duration(milliseconds: 3000);

  // Manage access token
  Future<void> setAccessToken(String? accessToken) async {
    if (accessToken == null || accessToken.isEmpty) return;
    final prefs = await SharedPreferences.getInstance();
    final encrypted = encrypter.encrypt(accessToken, iv: iv);
    prefs.setString('access_token', encrypted.base64);
  }

  Future<String?> getAccessToken() async {
    final prefs = await SharedPreferences.getInstance();
    final encrypted = prefs.getString('access_token');
    if (encrypted == null || encrypted.isEmpty) return null;
    final decrypted = encrypter.decrypt(Encrypted.fromBase64(encrypted), iv: iv);
    return decrypted;
  }

  Future<void> removeAccessToken() async {
    final prefs = await SharedPreferences.getInstance();
    if (await prefs.containsKey('access_token')) {
      await prefs.remove('access_token');
    }
  }

  // Interceptors
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final accessToken = await getAccessToken();
    if (accessToken != null) {
      options.headers['Authorization'] = "Bearer $accessToken";
    }
  }

  void onResponse(Response response, ResponseInterceptorHandler handler) {
    return handler.next(response);
  }

  void onError(DioException err, ErrorInterceptorHandler handler) {
    switch (err.type) {
      case DioExceptionType.connectionTimeout:
        throw DioException.connectionError(requestOptions: err.requestOptions, reason: 'ConnectionTimeout Error', error: err.error);
      case DioExceptionType.sendTimeout:
        throw DioException.sendTimeout(timeout: sendTimeOut, requestOptions: err.requestOptions);
      case DioExceptionType.receiveTimeout:
        throw DioException.receiveTimeout(timeout: receiveTimeOut, requestOptions: err.requestOptions, error: err.error);
      case DioExceptionType.badResponse:
        print("STATUS CODE : ${err.response?.statusCode}");
        print("${err.response?.data}");
        throw DioException(requestOptions: err.requestOptions, error: err.error, type: err.type);
      default:
        print(err.message);
    }
    return handler.next(err);
  }

  // Handle requests
  Future<Response> get(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    void Function(int, int)? onReceiveProgress,
  }) async {
    try {
      final response = await dio.get(
        path, 
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      rethrow; 
    }
  }

  Future<Response> post(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    void Function(int, int)? onSendProgress,
    void Function(int, int)? onReceiveProgress,
  }) async {
    try {
      final response = await dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      rethrow; 
    }
  }

  Future<Response> put(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    void Function(int, int)? onSendProgress,
    void Function(int, int)? onReceiveProgress,
  }) async {
    try {
      final response = await dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      rethrow; 
    }
  }

  Future<Response> patch(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    void Function(int, int)? onSendProgress,
    void Function(int, int)? onReceiveProgress,
  }) async {
    try {
      final response = await dio.patch(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      rethrow; 
    }
  }

  Future<Response> delete(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );
      return response;
    } catch (e) {
      rethrow; 
    }
  }
}
