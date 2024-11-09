import 'package:mobile/models/user_model.dart';

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
    this.owners = const [],
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
  List<UserModel> owners;

  String get owwnerNames => owners.map((owner) => owner.name).join(', ');

  factory TrackModel.fromJson(Map<String, dynamic> json) => TrackModel(
    id: json['_id'] ?? '',
    albumId: json['album_id'] ?? '',
    name: json['name'] ?? '',
    imageLink: json['image'] ?? '',
    lyrics: json['lyrics'] ?? '',
    audioLink: json['path_audio'] ?? '',
    listenCount: json['listen'] ?? 0,
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()), 
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toIso8601String()),
    owners: List.from(json['owners']?.map(
      (ownerJson) => UserModel.fromJson(ownerJson)
    ) ?? []),
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
    'owners': owners.map((owner) => owner.toJson()),
  };

  @override
  String toString() {
    return '$name - $owwnerNames';
  }
}

enum TrackStatus {
  all,
  available,
  pending,
}