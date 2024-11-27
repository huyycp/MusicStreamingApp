import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/theme/text_theme.dart';

class SnackBarUtils {
  static final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

  SnackBarUtils._internal();

  static void showSnackBar({
    required String message,
    MessageTypes status = MessageTypes.info,
  }) {

    Color color;
    switch (status) {
      case MessageTypes.success:
        color = SUCCESS_COLOR;
        break;
      case MessageTypes.warning:
        color = WARNING_COLOR;
        break;
      case MessageTypes.error:
        color = ERROR_COLOR;
        break;
      default:
        color = BUTTON_STROKE;
    }
    scaffoldMessengerKey.currentState?.showSnackBar(SnackBar(
      backgroundColor: GRAY_BCK_1,
      behavior: SnackBarBehavior.floating,
      duration: const Duration(seconds: 2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide.none,
      ),
      padding: EdgeInsets.zero,
      margin: const EdgeInsets.symmetric(horizontal: 16),
      content: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: color,
              width: 3,
            ),
          ),
        ),
        child: Text(
          message,
          style: BaseTextTheme.TITLE_SMALL.copyWith(
            color: color,
          ),
          softWrap: true,
          overflow: TextOverflow.ellipsis,
        ),
      ),
    ));
  }
}

enum MessageTypes {
  success,
  warning,
  error,
  info,
}