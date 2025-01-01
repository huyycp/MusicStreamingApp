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
    required this.isPremium,
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
  bool isPremium;

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    role: UserRole.values.firstWhere((role) => role.index == (json['role'] ?? 0)),
    email: json['email'] ?? '',
    gender: json['gender'] ?? '',
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()),
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toIso8601String()),
    status: UserStatus.values.firstWhere((status) => status.index == (json['verify'] ?? UserStatus.banned.index)),
    avatarLink: json['avatar'] ?? '',
    favoriteGenres: List.from(json['genres']?.map(
      (genreJson) => GenreModel.fromJson(genreJson),
    ) ?? []),
    isPremium: json['premium'] ?? false,
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
    'premium': isPremium,
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

enum AppAuthType {
  inapp, // Auth with email and password
  oauth,
  unknown,
}