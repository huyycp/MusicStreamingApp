import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/track/track_widget.dart';

class TrackActionSheet extends ConsumerStatefulWidget {
  const TrackActionSheet(this.track, {super.key});
  final TrackModel track;

  @override
  ConsumerState<TrackActionSheet> createState() => _TrackActionSheetState();
}

class _TrackActionSheetState extends ConsumerState<TrackActionSheet> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        _trackInfo(),
        Divider(
          color: BUTTON_STROKE.withOpacity(0.25),
        ),
        _trackActions(),
      ],
    );
  }

  Widget _trackInfo() {
    return Container(
      padding: const EdgeInsets.only(left: 16, bottom: 6, right: 16),
      child: TrackWidget(widget.track)
    );
  }

  Widget _trackActions() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _removeTrackBtn(),
        ],
      ),
    );
  }

  Widget _removeTrackBtn() {
    return GestureDetector(
      onTap: () {
        ref.read(detailLibraryViewModel).removeTrackFromPlaylist(widget.track);
      },
      child: Row(
        children: [
          DynamicImage(
            'assets/icons/ic_add_circle.svg',
            width: 24,
            height: 24,
          ),
          const SizedBox(width: 16),
          Text(
            'Remove from this playlist',
            style: Theme.of(context).textTheme.titleMedium
          ),
        ],
      ),
    );
  }
}