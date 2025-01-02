import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/report_model.dart';

class GetReportReq {
  GetReportReq({
    required this.pagination,
    this.status
  });

  PaginationListReq pagination;
  ReportStatus? status;

  Map<String, dynamic> toJson() => {
    'limit': pagination.limit,
    'page': pagination.page,
    'status': status?.name
  };
}