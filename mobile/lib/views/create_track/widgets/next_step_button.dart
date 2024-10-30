import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';

class NextStepButton extends ConsumerWidget {
  final String destination;
  const NextStepButton(this.destination, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: ElevatedButton(
        onPressed: () {
          print(ref.watch(createTrackViewModel).trackTitleController.text);
          context.push(destination);
        },
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
    );
  }
}