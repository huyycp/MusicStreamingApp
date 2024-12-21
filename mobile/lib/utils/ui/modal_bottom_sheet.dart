import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';

void showAppModalBottomSheet({
  required BuildContext context,
  required Widget Function(BuildContext) builder
}) {
  showModalBottomSheet(
    context: context,
    showDragHandle: true,
    backgroundColor: GRAY_BCK_1,
    enableDrag: true,
    useSafeArea:  true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(16),
        topRight: Radius.circular(16),
      )
    ),
    builder: builder,
  );
}