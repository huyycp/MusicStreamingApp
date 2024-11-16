import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/widgets/base_button.dart';

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
      child: BaseButton(
        onPressed: enabled 
          ? () {
              if (extraAction != null) {
                extraAction!();
              }
              context.push(destination);
            }
          : null,
        child: const Text('Next'),
      ),
    );
  }
}