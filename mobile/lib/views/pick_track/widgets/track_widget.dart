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
    bool isPicked = ref.watch(pickTrackViewModel.select(
      (value) => value.pickedTracks,
    )).contains(track);

    return GestureDetector(
      onTap: () {
        ref.read(pickTrackViewModel).togglePickTrack(track);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: isPicked ? GRAY_BCK_2 : GRAY_BCK_1,
        ),
        child: Row(
          children: [
            DynamicImage(
              track.imageLink,
              width: 76,
              height: 76,
              borderRadius: BorderRadius.circular(20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                track.name,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            )
          ],
        ),
      ),
    );
  }

  void _onTap() {
    
  }
}