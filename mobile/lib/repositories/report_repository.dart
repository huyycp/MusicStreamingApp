import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/report_remote_data_source.dart';
import 'package:mobile/data/dto/req/create_report_req.dart';
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
  }) async {
    final req = CreateReportReq(
      trackId: trackId,
      reason: reason,
      subject: subject,
      body: body,
    );
    return await _reportRemote.createReport(req);
  }
}