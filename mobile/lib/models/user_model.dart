// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:mobile/models/genre_model.dart';

class UserModel {
  UserModel({
    required this.id,
    required this.name,
    required this.role,
    required this.email,
    required this.gender,
    required this.createdAt,
    required this.updatedAt,
    required this.status,
    required this.avatarLink,
    required this.favoriteGenres,
  });

  String id;
  String name;
  UserRole role;
  String email;
  String gender;
  DateTime createdAt;
  DateTime updatedAt;
  UserStatus status;
  String avatarLink;
  List<GenreModel> favoriteGenres;

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    role: UserRole.values.firstWhere((role) => role.index == (json['role'] ?? 0)),
    email: json['email'] ?? '',
    gender: json['gender'] ?? '',
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now()),
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now()),
    status: UserStatus.values.firstWhere((status) => status.index == (json['verify'] ?? UserStatus.banned.index)),
    avatarLink: json['avatar'] ?? '',
    favoriteGenres: List.from(json['genres']?.map(
      (genreJson) => GenreModel.fromJson(genreJson),
    ) ?? []),
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'name': name,
    'role': role.index,
    'email': email,
    'gender': gender,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
    'verify': status.index,
    'avatar': avatarLink,
    'genres': favoriteGenres.map((genre) => genre.toJson()),
  };
}

enum UserRole {
  listener,
  artist,
}

enum UserStatus {
  verified,
  banned,
}