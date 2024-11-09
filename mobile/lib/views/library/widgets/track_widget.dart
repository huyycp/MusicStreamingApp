import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class TrackWidget extends ConsumerWidget {
  final TrackModel track;
  const TrackWidget(this.track, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: GRAY_BCK_1,
      ),
      child: Row(
        children: [
          DynamicImage(
            track.imageLink,
            width: 76,
            height: 76,
            borderRadius: BorderRadius.circular(10),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  track.name,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Text(
                  track.owwnerNames,
                  style: Theme.of(context).textTheme.labelLarge,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}