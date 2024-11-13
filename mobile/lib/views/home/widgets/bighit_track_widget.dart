import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class BighitTrackWidget extends ConsumerWidget {
  final TrackModel track;
  const BighitTrackWidget(this.track, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () => ref.read(mainAudioController).setPlaylist(tracks: [track]),
      child: SizedBox(
        width: size,
        height: size + 20,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _trackImage(),
            const SizedBox(height: 8),
            _trackName(context),
            _trackOwners(context),
          ],
        ),
      ),
    );
  }

  Widget _trackImage() {
    return DynamicImage(
      track.imageLink,
      width: size,
      height: size,
    );
  }

  Widget _trackName(BuildContext context) {
    return Text(
      track.name,
      style: Theme.of(context).textTheme.titleSmall,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackOwners(BuildContext context) {
    return Text(
      track.ownerNames,
      style: Theme.of(context).textTheme.bodyMedium,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  } 
}