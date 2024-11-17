import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/create_report_req.dart';
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
    final response = await _magicMusicApi.request(
      '$_reportPath/tracks/${req.trackId}',
      method: HttpMethods.POST,
      data: req.toJson(),
    );
    if (response.statusCode == HttpStatus.created) {
      final data = response.data['result'];
      if (data != null) {
        return ReportModel.fromJson(data);
      }
    }
    return null;
  }

}