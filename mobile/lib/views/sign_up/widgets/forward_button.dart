import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class ForwardButton extends ConsumerWidget {
  final GlobalKey<FormState> currentFormKey;
  final String destination;
  const ForwardButton({required this.destination, required this.currentFormKey, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return  ElevatedButton(
      onPressed: () {
        if (currentFormKey.currentState!.validate()) {
          context.push(destination);
        }
      },
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.black,
        disabledForegroundColor: Colors.black,
        backgroundColor: Color(0xFFFFFFFF),
        disabledBackgroundColor: Color(0xFF535353),
      ),
      child: const Text('Next'),
    );
  }
}