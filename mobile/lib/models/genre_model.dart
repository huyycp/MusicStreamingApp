class GenreModel {
  GenreModel({
    required this.id,
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    required this.imageLink,
  });

  String id;
  String name;
  DateTime createdAt;
  DateTime updatedAt;
  String imageLink;

  factory GenreModel.fromJson(Map<String, dynamic> json) => GenreModel(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toString()),
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toString()),
    imageLink: json['image'] ?? '',
  );
  
  Map<String, dynamic> toJson() => {
    '_id': id,
    'name': name,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
    'image': imageLink,
  };
}
