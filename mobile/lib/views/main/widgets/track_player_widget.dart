import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:marquee/marquee.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/views/main/track_player_view.dart';
import 'package:mobile/views/main/widgets/track_player_widget_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class TrackPlayerWidget extends ConsumerStatefulWidget {
  const TrackPlayerWidget({super.key});

  @override
  ConsumerState<TrackPlayerWidget> createState() => _AudioWidgetState();
}

class _AudioWidgetState extends ConsumerState<TrackPlayerWidget> {
  @override
  Widget build(BuildContext context) {
    ref.listen(mainAudioController.select((value) => value.currentTrack), (prev, next) {
      if (next.id.isNotEmpty) {
        ref.read(trackPlayerWidgetModel).checkFavoriteTrack(next.id);
      }
    });

    return ref.watch(mainAudioController).available
      ? GestureDetector(
          onTap: () {
            _showTrackPlayerView();
          },
          child: Container(
            height: 66,
            width: 380,
            padding: const EdgeInsets.only(right: 10, left: 10, top: 8),
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
        )
      : const SizedBox.shrink();
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
          child: GestureDetector(
            onHorizontalDragDown: (details) {
              int sensitivity = 10;
              if (details.localPosition.dx > sensitivity) ref.read(mainAudioController).playPrevTrack();
              if (details.localPosition.dx < -sensitivity) ref.read(mainAudioController).playNextTrack();
            },
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _trackTitle(track.name),
                _trackAuthors(track.ownerNames),
              ],
            ),
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
    return LayoutBuilder(
      builder: (context, constraints) => SizedBox(
        height: 24,
        child: Marquee(
          text: title,
          style: Theme.of(context).textTheme.titleMedium,
          pauseAfterRound: const Duration(seconds: 3),
          startAfter: const Duration(seconds: 3),
          blankSpace: constraints.maxWidth,
          velocity: 100
        ),
      ),
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
        _addFavoriteBtn(),
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
        'assets/icons/ic_close_light.svg',
        width: 20,
        height: 20,
        color: Colors.white,
      ),
    );
  }

  Widget _addFavoriteBtn() {
    bool isFavorite = ref.watch(trackPlayerWidgetModel.select(
      (value) => value.isFavorite
    ));
    return IconButton(
      onPressed: isFavorite
        ? () {
          
        }
        : () {
          ref.read(trackPlayerWidgetModel).addTracksToFavorite(
            ref.watch(mainAudioController.select((value) => value.currentTrack.id)),
            (isDone) {
              if (isDone == null) return;
              if (isDone) {
                SnackBarUtils.showSnackBar(message: 'Add to favorite successfully', status: MessageTypes.success);
              } else {
                SnackBarUtils.showSnackBar(message: 'Add to favorite failed', status: MessageTypes.error);
              }
            }
          );
        },
      icon: DynamicImage(
        isFavorite ? 'assets/icons/ic_added_check.svg' : 'assets/icons/ic_add_circle.svg',
        width: 24,
        height: 24,
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