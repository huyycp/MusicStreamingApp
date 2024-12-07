import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AudioImageWidget extends StatefulWidget {
  const AudioImageWidget({
    required this.imagePath,
    this.audioPath,
    this.size = 64,
    this.borderRadius = BorderRadius.zero,
    this.padding = EdgeInsets.zero,
    super.key,
  });

  final String imagePath;
  final String? audioPath;
  final double size;
  final BorderRadius borderRadius;
  final EdgeInsets padding;

  @override
  State<AudioImageWidget> createState() => _AudioImageWidgetState();
}

class _AudioImageWidgetState extends State<AudioImageWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: widget.padding,
      decoration: BoxDecoration(
        borderRadius: widget.borderRadius,
        border: Border.all(
          color: GRAY_BCK_2,
        )
      ),
      child: DynamicImage(
        widget.imagePath,
        width: widget.size,
        height: widget.size,
        borderRadius: widget.borderRadius,
      ),
    );
  }
}