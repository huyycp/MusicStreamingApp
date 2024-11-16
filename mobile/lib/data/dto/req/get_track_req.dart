import 'package:mobile/data/dto/req/pagination_list_req.dart';

class GetTrackReq {
  GetTrackReq({
    required this.pagination,
    this.genreId = '',
  });

  PaginationListReq pagination;
  String genreId;
  
  Map<String, dynamic> toJson() => {
    'page': pagination.page,
    'limit': pagination.limit,
    if (genreId.isNotEmpty) 'genre': genreId,
  };
}