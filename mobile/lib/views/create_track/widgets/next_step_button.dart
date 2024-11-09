import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class NextStepButton extends ConsumerWidget {
  final String destination;
  final bool enabled;
  final void Function()? extraAction;
  const NextStepButton({
    required this.destination,
    required this.enabled,
    this.extraAction,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        child: ElevatedButton(
          onPressed: enabled 
            ? () {
                if (extraAction != null) {
                  extraAction!();
                }
                context.push(destination);
              }
            : null,
          style: ElevatedButton.styleFrom(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            textStyle: const TextStyle(
              fontWeight: FontWeight.w500
            )
          ),
          child: const Text('Next'),
        ),
      ),
    );
  }
}