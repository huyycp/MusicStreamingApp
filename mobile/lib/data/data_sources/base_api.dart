import 'package:dio/dio.dart';

abstract class BaseApi {
  BaseApi() {
    dio = Dio(
      BaseOptions(
        connectTimeout: const Duration(seconds: 10),
        sendTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
      ) 
    );
  }

  late Dio dio;
}