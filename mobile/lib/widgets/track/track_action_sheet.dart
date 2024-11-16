import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/theme/color_scheme.dart';
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
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('abc')
        ],
      ),
    );
  }
}