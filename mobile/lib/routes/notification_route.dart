import 'package:go_router/go_router.dart';
import 'package:mobile/views/notification/notification_view.dart';

class NotificationRoute {
  NotificationRoute._();

  static RouteBase get routes => _notificationRoute;
  static const String _baseNoti = '/notification';

  static String get notification => _baseNoti;

  static final GoRoute _notificationRoute = GoRoute(
    path: _baseNoti,
    builder: (context, state) => const NotificationView()
  );
}