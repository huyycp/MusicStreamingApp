import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

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
    
    storage = FlutterSecureStorage(
      aOptions: AndroidOptions(
        encryptedSharedPreferences: true
      ),
      iOptions: IOSOptions(
        accessibility: KeychainAccessibility.first_unlock,
      )
    );
  }

  late Dio dio;
  late final FlutterSecureStorage storage;
  final connectTimeOut = Duration(milliseconds: 3 * 60000);
  final sendTimeOut = Duration(milliseconds: 3 * 60000);
  final receiveTimeOut = Duration(milliseconds: 3 * 60000);

  set token(String? value) {
    String? bearerToken;
    if (value != null && value.isNotEmpty) {
      bearerToken = value.startsWith('Bearer') ? value : 'Bearer $value';
    }
    if (dio.options.headers[HttpHeaders.authorizationHeader] != bearerToken) {
      dio.options.headers[HttpHeaders.authorizationHeader] = bearerToken;
    }
  }

  String get token => dio.options.headers[HttpHeaders.authorizationHeader] ?? '';

  set baseUrl(String baseUrl) {
    dio.options.baseUrl = baseUrl;
  }

  String get baseUrl => dio.options.baseUrl;

  // Manage access token
  Future<void> setAccessToken(String? accessToken) async {
    if (accessToken == null || accessToken.isEmpty) return;
    await storage.write(key: 'access_token', value: accessToken);
  }

  Future<String?> getAccessToken() async {
    return await storage.read(key: 'access_token');
  }

  Future<void> removeAccessToken() async {
    await storage.delete(key: 'access_token');
  }

  // Manage refresh token
  Future<void> setRefreshToken(String? refreshToken) async {
    if (refreshToken == null || refreshToken.isEmpty) return;
    await storage.write(key: 'refresh_token', value: refreshToken);
  }

  Future<String?> getRefreshToken() async {
    return await storage.read(key: 'refresh_token');
  }

  Future<void> removeRefreshToken() async {
    await storage.delete(key: 'refresh_token');
  }

  Future<({String? accessToken, String? refreshToken})> refreshToken();

  // Interceptors
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {

    // Check expire token
    var accessToken = token;
    if (accessToken.isNotEmpty) {
      if (accessToken.startsWith('Bearer')) {
        accessToken = accessToken.substring('Bearer '.length);
      }
      if (JwtDecoder.isExpired(accessToken)) {
        final newTokens = await refreshToken();
        token = newTokens.accessToken;
        options.headers[HttpHeaders.authorizationHeader] = token;
        options.headers[HttpHeaders.userAgentHeader] = 'mobile ${newTokens.refreshToken}';
      }
    }
  
    debugPrint('${options.uri.toString()} ${options.method}');
    return handler.next(options);
  }

  void onResponse(Response response, ResponseInterceptorHandler handler) {
    debugPrint('STATUS CODE ${response.statusCode}: ${response.data.toString()}');
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
}
