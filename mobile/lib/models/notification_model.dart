import 'package:mobile/utils/enum_utils.dart';

class NotificationModel {
  NotificationModel({
    required this.id,
    required this.userId,
    required this.title,
    this.content = '',
    required this.type,
    required this.artifactId,
    this.seen = false,
    required this.createdAt,
    required this.updatedAt,
  });

  String id;
  String userId;
  String title;
  String content;
  NotificationType type;
  String artifactId;
  bool seen;
  DateTime createdAt;
  DateTime updatedAt;

  factory NotificationModel.fromJson(Map<String, dynamic> json) => NotificationModel(
    id: json['_id'] ?? '',
    userId: json['user_id'] ?? '',
    title: json['title'] ?? '',
    content: json['content'] ?? '',
    type: enumFromString(NotificationType.values, json['type'], NotificationType.unknown),
    artifactId: json['artifact_id'] ?? '',
    seen: json['seen'] ?? false,
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toString()),
    updatedAt: DateTime.parse(json['updated_at'] ?? DateTime.now().toString()),
  );
}

enum NotificationType {
  reports,
  tracks,
  unknown,
}