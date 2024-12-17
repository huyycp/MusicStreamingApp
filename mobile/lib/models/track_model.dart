import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/utils/enum_utils.dart';

class TrackModel {
  TrackModel ({
    required this.id,
    this.album,
    required this.name,
    this.description = '',
    required this.imageLink,
    this.lyrics = '',
    required this.audioLink,
    this.listenCount = 0,
    this.createdAt,
    this.updatedAt,
    this.owners = const [],
    this.status = TrackStatus.pending,
  });

  String id;
  LibraryModel? album;
  String name;
  String imageLink;
  String description;
  String lyrics;
  String audioLink;
  int listenCount;
  DateTime? createdAt;
  DateTime? updatedAt;
  List<UserModel> owners;
  GenreModel? genre;
  TrackStatus status;

  String get ownerNames => owners.map((owner) => owner.name).join(', ');

  factory TrackModel.fromJson(Map<String, dynamic> json) => TrackModel(
    id: json['_id'] ?? '',
    album: LibraryModel.fromJson(json['album'] ?? {}),
    name: json['name'] ?? '',
    imageLink: json['image'] ?? '',
    lyrics: json['lyrics'] ?? '',
    audioLink: json['path_audio'] ?? '',
    listenCount: int.parse(json['listen']?.toString() ?? '0'),
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()), 
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toIso8601String()),
    owners: List.from(json['owners']?.map(
      (ownerJson) => UserModel.fromJson(ownerJson)
    ) ?? []),
    status: enumFromString(TrackStatus.values, json['status'], TrackStatus.unknown),
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'album': album?.toJson(),
    'name': name,
    'image': imageLink,
    'description': description,
    'lyrics': lyrics,
    'path_audio': audioLink,
    'listen': listenCount,
    'created_at': createdAt,
    'updated_at': updatedAt,
    'owners': owners.map((owner) => owner.toJson()),
    'status': status.name,
  };

  @override
  String toString() {
    return '$name - $ownerNames';
  }
}

enum TrackStatus {
  pending,
  active,
  banned,
  unknown,
}

enum TrackLibraryStatus {
  all,
  available,
  pending,
}