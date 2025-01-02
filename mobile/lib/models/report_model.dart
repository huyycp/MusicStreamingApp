import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';

class ReportModel {
  ReportModel({
    required this.id,
    required this.reportedItemId,
    required this.reportType,
    required this.userId,
    required this.reasons,
    required this.subject,
    required this.body,
    required this.status,
    required this.createdAt,
    required this.imagePaths,
    required this.audioPath,
    required this.rejectionReason,
    this.reporter,
    this.track,
  });

  String id;
  String reportedItemId;
  ReportTypes reportType;
  String userId;
  List<String> reasons;
  String subject;
  String body;
  ReportStatus status;
  DateTime createdAt;
  List<String> imagePaths;
  String audioPath;
  String rejectionReason;
  UserModel? reporter;
  TrackModel? track;

  factory ReportModel.fromJson(Map<String, dynamic> json) => ReportModel(
    id: json['_id'] ?? '',
    reportedItemId: json['reported_item_id'] ?? '',
    reportType: ReportTypes.values.firstWhere(
      (type) => type.name == (json['reported_item_type'] ?? ReportTypes.unknown.name)
    ),
    userId: json['user_id'] ?? '',
    reasons: List.from(json['reason']?.map((reasonJson) => reasonJson.toString()) ?? []),
    subject: json['subject'] ?? '',
    body: json['body'] ?? '',
    status: ReportStatus.values.firstWhere(
      (status) => status.name == (json['status'] ?? ReportStatus.unknown.name)
    ),
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()),
    imagePaths: List.from(json['image']?.map((imageJson) => imageJson.toString()) ?? []),
    audioPath: json['path_audio'] ?? '',
    rejectionReason: json['rejection_reason'] ?? '',
    reporter: json['reporters'] != null ? UserModel.fromJson(json['reporters']) : null,
    track: json['tracks'] != null ? TrackModel.fromJson(json['tracks']) : null,
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'reported_item_id': reportedItemId,
    'reported_item_type': reportType.name,
    'user_id': userId,
    'reason': reasons,
    'subject': subject,
    'body': body,
    'status': status.name,
    'created_at': createdAt.toIso8601String(),
    'image': imagePaths,
    'path_audio': audioPath,
    'rejection_reason': rejectionReason,
    'reporters': reporter?.toJson(),
    'tracks': track?.toJson(),
  };
}

enum ReportTypes {
  track,
  album,
  user,
  unknown,
}

enum ReportStatus {
  pending,
  resolved,
  dismissed,
  unknown,
}