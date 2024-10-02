import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class NextStepButton extends ConsumerWidget {
  final String destination;
  const NextStepButton(this.destination, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: ElevatedButton(
        onPressed: () {
          context.push(destination);
        },
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          textStyle: TextStyle(
            fontWeight: FontWeight.w500
          )
        ),
        child: const Text('Next'),
      ),
    );
  }
}