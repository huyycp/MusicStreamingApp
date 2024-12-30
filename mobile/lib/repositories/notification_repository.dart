import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/notification_remote_data_source.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_notification_resp.dart';

final notificationRepoProvider = Provider<NotificationRepository>(
  (ref) => NotificationRepository(ref)
);

class NotificationRepository {
  NotificationRepository(ProviderRef ref) {
    _notiRemote = ref.read(notificationRemoteProvider);
  }

  late final NotificationRemoteDataSource _notiRemote;

  Future<GetNotificationResp> getNotifications(PaginationListReq pagination) async {
    return await _notiRemote.getNotifications(pagination);
  }

  Future<bool> makeNotiAsRead(String notiId) async {
    return await _notiRemote.makeNotiAsRead(notiId);
  }

  Future<bool> makeAllNotiAsRead() async {
    return await _notiRemote.makeAllNotiAsRead();
  }
}