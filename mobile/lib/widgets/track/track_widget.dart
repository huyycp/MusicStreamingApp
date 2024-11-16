import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/utils/modal_bottom_sheet.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/track/track_action_sheet.dart';

class TrackWidget extends ConsumerWidget {
  final TrackModel track;
  final bool isMenuVisible;
  const TrackWidget(
    this.track, {
    this.isMenuVisible = false,
    super.key
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () => ref.read(mainAudioController).setPlaylist(tracks: [ track ]),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          _trackImage(),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _trackTitle(context),
                _trackOwner(context),
              ],
            ),
          ),
          const SizedBox(width: 12),
          _openMenuBtn(context),
        ],
      ),
    );
  }

  Widget _trackImage() {
    return DynamicImage(
      track.imageLink,
      width: 56,
      height: 56,
      borderRadius: BorderRadius.circular(4),
    );
  }

  Widget _trackTitle(BuildContext context) {
    return Text(
      track.name,
      style: Theme.of(context).textTheme.titleMedium,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackOwner(BuildContext context) {
    return Text(
      track.ownerNames,
      style: Theme.of(context).textTheme.labelLarge,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _openMenuBtn(BuildContext context) {
    return Visibility(
      visible: isMenuVisible,
      child: IconButton(
        onPressed: () {
          showAppModalBottomSheet(
            context: context,
            builder: (context) => TrackActionSheet(track),
          );
        },
        icon: DynamicImage(
          'assets/icons/ic_menu.svg',
          width: 16,
          height: 16,
        ),
      ),
    );
  }
}