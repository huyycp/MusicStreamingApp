class MetaResp {
  MetaResp({
    this.itemsPerPage = 0,
    this.totalItems = 0,
    this.currentPage = 0,
    this.totalPages = 0,
  });

  int itemsPerPage;
  int totalItems;
  int currentPage;
  int totalPages;

  factory MetaResp.fromJson(Map<String, dynamic> json) => MetaResp(
    itemsPerPage: json['items_per_page'] ?? 0,
    totalItems: json['total_items'] ?? 0,
    currentPage: json['current_page'] ?? 0,
    totalPages: json['total_pages'] ?? 0,
  );
}