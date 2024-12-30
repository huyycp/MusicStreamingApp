import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';

class NotificationNavWidget extends StatelessWidget {
  const NotificationNavWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.notifications, color: BUTTON_STROKE, size: 32),
      onPressed: () {
        context.push(RouteNamed.notification);
      },
    );
  }
}