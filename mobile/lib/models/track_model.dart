class TrackModel {
  TrackModel ({
    required this.id,
    required this.albumId,
    required this.name,
    this.description = '',
    required this.imageLink,
    this.lyrics = '',
    required this.audioLink,
    this.listenCount = 0,
    this.createdAt,
    this.updatedAt,
    this.artists = const [],
  });

  String id;
  String albumId;
  String name;
  String imageLink;
  String description;
  String lyrics;
  String audioLink;
  int listenCount;
  DateTime? createdAt;
  DateTime? updatedAt;
  List<String> artists;

  factory TrackModel.fromJson(Map<String, dynamic> json) => TrackModel(
    id: json['_id'] ?? '',
    albumId: json['album_id'] ?? '',
    name: json['name'] ?? '',
    imageLink: json['image'] ?? '',
    lyrics: json['lyrics'] ?? '',
    audioLink: json['path_audio'] ?? '',
    listenCount: json['listen'] ?? 0,
    createdAt: DateTime.parse(json['created_at'] ?? ''), 
    updatedAt: DateTime.parse(json['updated_at'] ?? ''),
    artists: List.from(json['artistsName'] ?? []),
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'album_id': albumId,
    'name': name,
    'image': imageLink,
    'description': description,
    'lyrics': lyrics,
    'path_audio': audioLink,
    'listen': listenCount,
    'created_at': createdAt,
    'updated_at': updatedAt,
    'artistsName': artists,
  };
}

enum TrackStatus {
  all,
  available,
  pending,
}