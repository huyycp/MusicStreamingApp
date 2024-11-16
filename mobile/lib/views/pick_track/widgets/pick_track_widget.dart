import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/pick_track/pick_track_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class PickTrackWidget extends ConsumerWidget {
  final TrackModel track;
  const PickTrackWidget(this.track, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      decoration: const BoxDecoration(
        color: GRAY_BCK_1,
      ),
      child: Row(
        children: [
          DynamicImage(
            track.imageLink,
            width: 64,
            height: 64,
            borderRadius: BorderRadius.circular(8),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  track.name,
                  overflow: TextOverflow.ellipsis,
                  style: Theme.of(context).textTheme.titleMedium,
                  maxLines: 2,
                ),
                Text(
                  track.ownerNames,
                  overflow: TextOverflow.ellipsis,
                  style: Theme.of(context).textTheme.bodyMedium
                )
              ],
            ),
          ),
          IconButton(
            onPressed: () {
              ref.read(pickTrackViewModel).addTrackToLibrary(track);
            },
            icon: DynamicImage(
              'assets/icons/ic_add_song.svg',
              width: 24,
              height: 24,
            ),
          )
        ],
      ),
    );
  }
}