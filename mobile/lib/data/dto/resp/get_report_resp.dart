import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/report_model.dart';

class GetReportResp {
  GetReportResp({
    required this.meta,
    required this.reports,
  });
  
  MetaResp meta;
  List<ReportModel> reports;

  factory GetReportResp.fromJson(Map<String, dynamic> json) => GetReportResp(
    meta: MetaResp.fromJson(json['meta'] ?? {}),
    reports: List.from(json['data']?.map(
      (reportJson) => ReportModel.fromJson(reportJson),
    ) ?? [])
  );
}