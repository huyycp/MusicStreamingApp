import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/notification_model.dart';

class GetNotificationResp {
  GetNotificationResp({
    required this.meta,
    this.notifications = const [],
  });

  MetaResp meta;
  List<NotificationModel> notifications;

  factory GetNotificationResp.fromJson(Map<String, dynamic> json) => GetNotificationResp(
    meta: MetaResp.fromJson(json['meta'] ?? {}),
    notifications: List.from(json['data']?.map(
      (notiJson) => NotificationModel.fromJson(notiJson)
    ) ?? [])
  );
}