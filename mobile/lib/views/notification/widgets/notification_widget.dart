import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:mobile/models/notification_model.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';

class NotificationWidget extends StatelessWidget {
  const NotificationWidget(this.notification, {super.key});
  final NotificationModel notification;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (notification.type == NotificationType.reports) {
          context.push('${RouteNamed.report}/${notification.artifactId}');
        } else if (notification.type == NotificationType.tracks) {
          // context.go('${RouteNamed.detailTrack}/${notification.artifactId}');
        }
      },
      child: Row(
        children: [
          Icon(
            notification.seen ? Icons.notifications : Icons.notifications_active,
            color: notification.seen ? Colors.grey : PRIMARY_COLOR,
          ),
          const SizedBox(width: 10.0),
          Expanded(
            flex: 3,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  notification.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontWeight: notification.seen ? FontWeight.normal : FontWeight.bold,
                    fontSize: 16.0,
                  ),
                ),
                const SizedBox(height: 5.0),
                Text(
                  notification.content,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14.0,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 10.0),
          Expanded(
            flex: 1,
            child: Text(
              DateFormat('yyyy-MM-dd kk:mm').format(notification.updatedAt.toLocal()),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.end,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12.0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}