import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';
import 'package:mobile/data/dto/req/create_report_req.dart';
import 'package:mobile/data/dto/req/get_report_req.dart';
import 'package:mobile/data/dto/resp/get_report_resp.dart';
import 'package:mobile/models/report_model.dart';

final reportRemoteProvider = Provider<ReportRemoteDataSource>(
  (ref) => ReportRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider),
  )
);

class ReportRemoteDataSource {
  ReportRemoteDataSource({
    required MagicMusicApi magicMusicApi,
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _reportPath = '/reports';

  Future<ReportModel?> createReport(CreateReportReq req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      '$_reportPath/tracks/${req.trackId}',
      method: HttpMethods.POST,
      data: data,
    );
    if (response.statusCode == HttpStatus.created) {
      final data = response.data['result'];
      if (data != null) {
        return ReportModel.fromJson(data);
      }
    }
    return null;
  }

  Future<GetReportResp> getReports(GetReportReq req) async {
    final response = await _magicMusicApi.request(
      '$_reportPath/my-reports',
      method: HttpMethods.GET,
      queryParameters: req.toJson(),
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return GetReportResp.fromJson(data ?? {});
    }
    return GetReportResp.fromJson({});
  }

  Future<ReportModel?> getReport(String reportId) async {
    final response = await _magicMusicApi.request(
      '$_reportPath/$reportId',
      method: HttpMethods.GET,
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return ReportModel.fromJson(data);
      }
    }
    return null;
  }
}