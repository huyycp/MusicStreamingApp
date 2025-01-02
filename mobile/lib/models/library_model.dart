// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';

class LibraryModel {
  LibraryModel({
    required this.id,
    required this.name,
    required this.type,
    this.imageLink = '',
    this.isFavorite = false,
    required this.createdAt,
    required this.updatedAt,
    this.owners = const [],
    this.numOfTracks = 0,
    this.tracks = const [],
  });

  String id;
  String name;
  LibraryType type;
  String imageLink;
  bool isFavorite;
  DateTime createdAt;
  DateTime updatedAt;
  List<UserModel> owners;
  int numOfTracks;
  List<TrackModel> tracks;
  String get ownersName => owners.map((owner) => owner.name).join(' ,');

  factory LibraryModel.fromJson(Map<String, dynamic> json) => LibraryModel(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    type: LibraryType.values.firstWhere((type) => type.name == (json['type'] ?? LibraryType.album.name)),
    imageLink: json['image'] ?? '',
    isFavorite: json['favorite'] ?? false,
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()),
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toIso8601String()),
    owners: List.from(json['owners']?.map(
      (ownerJson) => UserModel.fromJson(ownerJson)
    ) ?? []),
    numOfTracks: json['number_of_tracks'] ?? 0,
    tracks: List.from(json['list_of_tracks']?.map(
      (trackJson) => TrackModel.fromJson(trackJson)
    ) ?? []),
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'name': name,
    'type': type.name,
    'image': imageLink,
    'favorite': isFavorite,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
    'owners': owners.map((owner) => owner.toJson()),
    'number_of_tracks': numOfTracks,
    'list_of_tracks': tracks.map((track) => track.toJson()),
  };
}

enum LibraryType {
  album,
  playlist,
}