import 'package:flutter/material.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class BottomSheetItem extends StatelessWidget {
  final String iconData;
  final String title;
  final String subtitle;
  final void Function()? onPressed;
  const BottomSheetItem({
    required this.iconData,
    required this.title,
    this.subtitle = '',
    this.onPressed,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: ListTile(
        leading: DynamicImage(
          iconData,
          width: 24,
          height: 24,
        ),
        title: Text(
          title,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            color: Colors.white,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        contentPadding: EdgeInsets.zero,
        horizontalTitleGap: 12,

      ),
    );
  }
}