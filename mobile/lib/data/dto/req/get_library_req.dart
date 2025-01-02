import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';

class GetLibraryReq {
  GetLibraryReq({
    required this.pagination,
    this.type,
    this.sortBy = 'created_at',
    this.direction = SortDirection.desc,
  });

  final PaginationListReq pagination;
  final LibraryType? type;
  final String sortBy;
  final SortDirection direction;

  Map<String, dynamic> toJson() => {
    'page': pagination.page,
    'limit': pagination.limit,
    if (type != null) 'type': type!.name,
    'sortBy': sortBy,
    'order': direction.name,
  };
}

enum SortDirection {
  asc,
  desc,
}