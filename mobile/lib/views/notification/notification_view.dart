import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/notification_model.dart';
import 'package:mobile/views/notification/notification_view_model.dart';
import 'package:mobile/views/notification/widgets/notification_shimmer_widget.dart';
import 'package:mobile/views/notification/widgets/notification_widget.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/app_appbar.dart';

class NotificationView extends ConsumerStatefulWidget {
  const NotificationView({super.key});

  @override
  ConsumerState<NotificationView> createState() => _NotificationViewState();
}

class _NotificationViewState extends ConsumerState<NotificationView> {
  @override
  void initState() {
    super.initState();
    ref.read(notificationViewModel).getNotifications();
  }

  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  PreferredSizeWidget _appBar() {
    return const PreferredSize(
      preferredSize: Size.fromHeight(80),
      child: AppAppbar(
        title: Text('Notifications'),
      ),
    );
  }

  Widget _body() {
    final notifications = ref.watch(notificationViewModel.select(
      (value) => value.notifications
    ));
    final isLoading = ref.watch(notificationViewModel.select(
      (value) => value.isLoading
    ));
    return isLoading
      ? _loadingNotification()
      : notifications.isEmpty
        ? _noNotifications()
        : _notifications(notifications);
  }

  Widget _noNotifications() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.notifications_none_sharp, size: 120, color: Colors.grey),
          const SizedBox(height: 24),
          Text('No notifications', style: Theme.of(context).textTheme.titleMedium),
        ],
      ),
    );
  }

  Widget _loadingNotification() {
    return Column(
      children: List.generate(5, (index) => const NotificationShimmerWidget()),
    );
  }

  Widget _notifications(List<NotificationModel> notifications) {
    return RefreshIndicator(
      onRefresh: () => ref.read(notificationViewModel).getNotifications(refresh: true),
      child: ListView.builder(
        controller: ref.read(notificationViewModel).scrollController,
        itemCount: notifications.length,
        itemBuilder: (context, index) => Container(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: NotificationWidget(notifications[index]),
        ),
      ),
    );
  }
}