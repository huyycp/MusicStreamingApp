import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/notification_model.dart';
import 'package:mobile/repositories/notification_repository.dart';

final notificationViewModel = ChangeNotifierProvider.autoDispose<NotificationViewModel>(
  (ref) => NotificationViewModel(ref)
);

class NotificationViewModel extends ChangeNotifier {
  NotificationViewModel(ChangeNotifierProviderRef ref) {
    _notiRepo = ref.read(notificationRepoProvider);
    scrollController.addListener(() {
      if (scrollController.position.pixels == scrollController.position.maxScrollExtent - 100 && !isLoading) {
        getNotifications();
      }
    });
  }

  late final NotificationRepository _notiRepo;
  List<NotificationModel> notifications = [];
  int page = 1;
  int limit = 20;
  bool isLoading = true;
  bool canLoad = true;
  final scrollController = ScrollController(); 

  Future<void> getNotifications({ bool refresh = false }) async {
    try {
      if (!canLoad) return;
      if (refresh) {
        if (notifications.isNotEmpty) {
          page = 1;
          scrollController.animateTo(0, duration: const Duration(milliseconds: 200), curve: Curves.easeInOut);
          notifications.clear();
        }
        // if (!isLoading) {
        //   isLoading = true;
        //   notifyListeners();
        // }
      }
      final pagination = PaginationListReq(page: page, limit: limit);
      final resp = await _notiRepo.getNotifications(pagination);
      if (resp.notifications.isNotEmpty) {
        notifications.addAll(resp.notifications);
        if (resp.meta.currentPage < resp.meta.totalPages) {
          page++;
          canLoad = true;
        } else {
          canLoad = false;
        }
      }
      isLoading = false;
      notifyListeners();
    } catch (e) {
      isLoading = false;
      notifyListeners();
      debugPrint(e.toString());
    }
  }

  Future<void> makeNotiAsRead(String notiId) async {
    final result = await _notiRepo.makeNotiAsRead(notiId);
    notifications.firstWhere((element) => element.id == notiId).seen = result;
    notifyListeners();
  }

  Future<void> makeAllNotiAsRead() async {
    final result = await _notiRepo.makeAllNotiAsRead();
    if (result) {
      for (var item in notifications) {
        item.seen = true;
      }
      notifyListeners();
    }
  }
}