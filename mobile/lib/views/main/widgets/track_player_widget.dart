import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/views/main/track_player_view.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class TrackPlayerWidget extends ConsumerStatefulWidget {
  const TrackPlayerWidget({super.key});

  @override
  ConsumerState<TrackPlayerWidget> createState() => _AudioWidgetState();
}

class _AudioWidgetState extends ConsumerState<TrackPlayerWidget> {
  @override
  Widget build(BuildContext context) {
    return ref.watch(mainAudioController).tracks.isEmpty
      ? const SizedBox.shrink()
      : GestureDetector(
          onTap: () {
            _showTrackPlayerView();
          },
          child: Container(
            height: 66,
            width: 380,
            padding: const EdgeInsets.only(right: 12, left: 12, top: 12),
            decoration: BoxDecoration(
              color: GRAY_BCK_1,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Expanded(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(child: _trackInfo()),
                      _trackControls(),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                _trackProgress(),
              ],
            ),
          ),
        );
  }

  Widget _trackInfo() {
    final track = ref.watch(mainAudioController.select(
      (value) => value.tracks[value.currentIndex]
    ));
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _trackImage(track.imageLink),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _trackTitle(track.name),
              _trackAuthors(track.ownerNames),
            ],
          ),
        )
      ],
    );
  }
 
  Widget _trackImage(String trackImage) {
    return DynamicImage(
      trackImage,
      width: 40,
      height: 40,
      borderRadius: BorderRadius.circular(4),
    );
  }

  Widget _trackTitle(String title) {
    return Text(
      title,
      style: Theme.of(context).textTheme.titleMedium,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackAuthors(String authors) {
    return Text(
      authors,
      style: Theme.of(context).textTheme.bodyMedium,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackControls() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        _stopBtn(),
        _playOrPauseBtn(),
      ],
    );
  }

  Widget _playOrPauseBtn() {
    bool playing = ref.watch(mainAudioController.select(
      (value) => value.playing
    ));
    return IconButton(
      onPressed: () {
        ref.watch(mainAudioController).playOrPause();
      },
      icon: DynamicImage(
        playing 
          ? 'assets/icons/ic_pause.svg'
          : 'assets/icons/ic_play.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _stopBtn() {
    return IconButton(
      onPressed: () {
        ref.read(mainAudioController).stop();
      },
      icon: DynamicImage(
        'assets/icons/ic_stop.svg',
        width: 20,
        height: 20,
        color: Colors.white,
      ),
    );
  }

  Widget _trackProgress() {
    double progress = ref.watch(mainAudioController.select(
      (value) => value.progress
    ));
    return LinearProgressIndicator(
      value: progress,
      color: Colors.white,
      minHeight: 2,
      backgroundColor: Colors.grey[300]?.withOpacity(0.5),
    );
  }

  void _showTrackPlayerView() {
    showModalBottomSheet(
      context: context,
      enableDrag: true,
      backgroundColor: Colors.transparent,
      useSafeArea: true,
      isScrollControlled: true,
      builder: (context) => const TrackPlayerView()
    );
  }
}