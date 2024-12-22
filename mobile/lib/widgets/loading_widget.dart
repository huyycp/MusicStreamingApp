import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';

class LoadingWidget extends StatelessWidget {
  final bool visible;
  final Size size;
  final EdgeInsets margin;
  const LoadingWidget({
    required this.visible, 
    this.size = const Size(20, 20),
    this.margin = const EdgeInsets.only(right: 8),
    super.key
  });

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: visible,
      child: Container(
        margin: margin,
        child: SizedBox.fromSize(
          size: size,
          child: const CircularProgressIndicator( 
            strokeWidth: 2, 
            color: BUTTON_STROKE,
          ),
        ),
      ),
    );
  }
}