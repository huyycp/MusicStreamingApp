class CreateReportReq {
  CreateReportReq({
    required this.trackId,
    required this.reason,
    required this.subject,
    required this.body,
  });

  String trackId;
  String reason;
  String subject;
  String body;

  Map<String, dynamic> toJson() => {
    'reason': reason,
    'subject': subject,
    'body': body,
  };
}
