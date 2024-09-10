import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/text_theme.dart';

class ForwardButton extends ConsumerWidget {
  final void Function()? onPressed;
  const ForwardButton({required this.onPressed, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return  ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.black,
        disabledForegroundColor: Colors.black,
        backgroundColor: Color(0xFFFFFFFF),
        disabledBackgroundColor: Color(0xFF535353),
      ),
      child: Text(
        'Next',
        style: BaseTextTheme.LABEL_BUTTON,
      ),
    );
  }
}