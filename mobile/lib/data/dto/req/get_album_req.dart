import 'package:mobile/data/dto/req/pagination_list_req.dart';

class GetAlbumReq {
  GetAlbumReq({
    required this.pagination,
  });

  PaginationListReq pagination;

  Map<String, dynamic> toJson() => {
    'page': pagination.page,
    'limit': pagination.limit,
  };
}
