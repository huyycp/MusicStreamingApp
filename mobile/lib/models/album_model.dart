class AlbumModel {
  AlbumModel({
    required this.id,
    required this.name,
    required this.image,
    required this.createdAt,
    required this.updatedAt,
    required this.artistsName,
    required this.numOfTracks,
  });

  String id;
  String name;
  String image;
  DateTime createdAt;
  DateTime updatedAt;
  List<String> artistsName;
  int numOfTracks;

  factory AlbumModel.fromJson(Map<String, dynamic> json) => AlbumModel(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    image: json['image'] ?? '',
    createdAt: DateTime.parse(json['created_at'] ?? ''),
    updatedAt: DateTime.parse(json['updated_at'] ?? ''),
    artistsName: List.from(json['artistsName'] ?? []),
    numOfTracks: json['number_of_tracks'] ?? 0,
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'image': image,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
    'artistsName': artistsName,
    'number_of_tracks': numOfTracks,
  };
}