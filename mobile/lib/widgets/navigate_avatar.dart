import 'package:flutter/widgets.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class NavigateAvatar extends StatelessWidget {
  const NavigateAvatar({
    required this.imageSource,
    this.onTap, 
    super.key,
  });

  final String imageSource;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        child: DynamicImage(
          imageSource,
          width: 10,
          height: 20,
          isCircle: true,
        ),
      ),
    );
  }
}