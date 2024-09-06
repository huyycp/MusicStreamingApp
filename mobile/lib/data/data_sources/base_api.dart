import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

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
  late FlutterSecureStorage storage;
  final connectTimeOut = Duration(milliseconds: 3000);
  final sendTimeOut = Duration(milliseconds: 3000);
  final receiveTimeOut = Duration(milliseconds: 3000);

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

  // Interceptors
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final accessToken = await getAccessToken();
    if (accessToken != null) {
      options.headers[HttpHeaders.authorizationHeader] = "Bearer $accessToken";
    }
    debugPrint(options.uri.toString());
    return handler.next(options);
  }

  void onResponse(Response response, ResponseInterceptorHandler handler) {
    debugPrint(response.data.toString());
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
