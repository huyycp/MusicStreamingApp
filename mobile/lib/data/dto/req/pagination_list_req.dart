class PaginationListReq {
  PaginationListReq({
    this.page = 1,
    this.limit = 5,
  });

  int page;
  int limit;

  Map<String, dynamic> toJson() => {
    'page': page,
    'limit': limit,
  };
}