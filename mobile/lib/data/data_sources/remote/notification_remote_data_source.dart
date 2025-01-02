import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_notification_resp.dart';

final notificationRemoteProvider = Provider<NotificationRemoteDataSource>(
  (ref) => NotificationRemoteDataSource(ref)
);

class NotificationRemoteDataSource {
  NotificationRemoteDataSource(ProviderRef ref) {
    _magicMusicApi = ref.read(magicMusicApiProvider);
  }


  late final MagicMusicApi _magicMusicApi;
  final String _notiPath = '/notifications';

  Future<GetNotificationResp> getNotifications(PaginationListReq pagination) async {
    final response = await _magicMusicApi.request(
      _notiPath,
      method: HttpMethods.GET,
      queryParameters: pagination.toJson(),
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return GetNotificationResp.fromJson(data ?? {});
    }
    return GetNotificationResp.fromJson({});
  }

  Future<bool> makeNotiAsRead(String notiId) async {
    final response = await _magicMusicApi.request(
      '$_notiPath/$notiId',
      method: HttpMethods.PATCH,
    );
    return response.statusCode == HttpStatus.ok;
  }

  Future<bool> makeAllNotiAsRead() async {
    final response = await _magicMusicApi.request(
      _notiPath,
      method: HttpMethods.PATCH,
    );
    return response.statusCode == HttpStatus.ok;
  }
}