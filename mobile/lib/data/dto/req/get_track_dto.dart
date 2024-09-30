import 'package:mobile/data/dto/req/pagination_list_dto.dart';

class GetTrackDto {
  GetTrackDto({
    required this.pagination,
  });

  PaginationListDto pagination;
  
  Map<String, dynamic> toJson() => {
    'page': pagination.page,
    'limit': pagination.limit,
  };
}