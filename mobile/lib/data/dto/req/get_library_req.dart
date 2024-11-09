import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';

class GetLibraryReq {
  GetLibraryReq({
    required this.pagination,
    required this.type,
  });

  PaginationListReq pagination;
  LibraryType type;

  Map<String, dynamic> toJson() => {
    'page': pagination.page,
    'limit': pagination.limit,
    'type': type.name,
  };
}
