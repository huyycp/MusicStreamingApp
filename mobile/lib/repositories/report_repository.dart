import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/report_remote_data_source.dart';
import 'package:mobile/data/dto/req/create_report_req.dart';
import 'package:mobile/data/dto/req/get_report_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_report_resp.dart';
import 'package:mobile/models/report_model.dart';

final reportRepoProvider = Provider<ReportRepository>(
  (ref) => ReportRepository(
    reportRemote: ref.read(reportRemoteProvider),
  )
);

class ReportRepository {
  ReportRepository({
    required ReportRemoteDataSource reportRemote
  }) : _reportRemote = reportRemote;

  final ReportRemoteDataSource _reportRemote;

  Future<ReportModel?> createReport({
    required String trackId,
    required String reason,
    required String subject,
    required String body,
    required List<XFile> images,
    required List<PlatformFile> audios,
  }) async {
    final req = CreateReportReq(
      trackId: trackId,
      reason: reason,
      subject: subject,
      body: body,
      images: images,
      audios: audios.map((audio) => File(audio.path!)).toList()
    );
    return await _reportRemote.createReport(req);
  }

  Future<GetReportResp> getReports({
    required PaginationListReq pagination,
    ReportStatus? status,
  }) async {
    final req = GetReportReq(
      pagination: pagination,
      status: status,
    );
    return await _reportRemote.getReports(req);
  }

  Future<ReportModel?> getReport(String reportId) async {
    return await _reportRemote.getReport(reportId);
  }
}