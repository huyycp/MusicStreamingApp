import 'package:mobile/data/dto/req/pagination_list_req.dart';

class GetArtistReq {
  GetArtistReq({
    required this.pagination,
  });

  final PaginationListReq pagination;

  Map<String, dynamic> toJson() => {
    'limit': pagination.limit,
    'page': pagination.page,
  };
}