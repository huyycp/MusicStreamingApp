class ReportModel {
  ReportModel({
    required this.id,
    required this.reportedItemId,
    required this.reportType,
    required this.userId,
    required this.reason,
    required this.subject,
    required this.body,
    required this.status,
    required this.createdAt,
  });

  String id;
  String reportedItemId;
  ReportTypes reportType;
  String userId;
  String reason;
  String subject;
  String body;
  ReportStatus status;
  DateTime createdAt;

  factory ReportModel.fromJson(Map<String, dynamic> json) => ReportModel(
    id: json['_id'] ?? '',
    reportedItemId: json['reported_item_id'] ?? '',
    reportType: ReportTypes.values.firstWhere(
      (type) => type.name == (json['reported_item_type'] ?? ReportTypes.unknown.name)
    ),
    userId: json['user_id'] ?? '',
    reason: json['reason'] ?? '',
    subject: json['subject'] ?? '',
    body: json['body'] ?? '',
    status: ReportStatus.values.firstWhere(
      (status) => status.name == (json['status'] ?? ReportStatus.unknown.name)
    ),
    createdAt: DateTime.parse(json['created_at'] ?? DateTime.now().toIso8601String()),
  );

  Map<String, dynamic> toJson() => {
    '_id': id,
    'reported_item_id': reportedItemId,
    'reported_item_type': reportType.name,
    'user_id': userId,
    'reason': reason,
    'subject': subject,
    'body': body,
    'status': status.name,
    'created_at': createdAt.toIso8601String(),
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