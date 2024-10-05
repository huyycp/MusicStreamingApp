import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/audio_controls/audio_controls_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AudioWidget extends ConsumerStatefulWidget {
  const AudioWidget({super.key});

  @override
  ConsumerState<AudioWidget> createState() => _AudioWidgetState();
}

class _AudioWidgetState extends ConsumerState<AudioWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      width: 0.90 * MediaQuery.sizeOf(context).width,
      padding: const EdgeInsets.only(right: 8, left: 8),
      decoration: BoxDecoration(
        color: GRAY_BCK_2,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Expanded(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Expanded(child: _trackInfo()),
                _trackControls(),
              ],
            ),
          ),
          _trackProgress(),
        ],
      ),
    );
  }

  Widget _trackInfo() {
    final track = ref.read(audioControlsViewModel.select(
      (value) => value.track
    ));
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _trackImage(track?.imageLink ?? ''),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _trackTitle(track?.name ?? ''),
              // const SizedBox(height: 8),
              _trackAuthors(track?.artistsName ?? ''),
            ],
          ),
        )
      ],
    );
  }
 
  Widget _trackImage(String trackImage) {
    return DynamicImage(
      trackImage,
      width: 30,
      height: 30,
      borderRadius: BorderRadius.circular(8),
    );
  }

  Widget _trackTitle(String title) {
    return Text(
      title,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackAuthors(String authors) {
    return Text(
      authors,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _trackControls() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _stopBtn(),
        const SizedBox(width: 8),
        _playOrPauseBtn(),
      ],
    );
  }

  Widget _playOrPauseBtn() {
    bool playing = ref.watch(audioControlsViewModel.select(
      (value) => value.playing
    ));
    return IconButton(
      onPressed: () {
        ref.watch(audioControlsViewModel).playOrPause();
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
        ref.read(audioControlsViewModel).stop();
      },
      icon: DynamicImage(
        'assets/icons/ic_close.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _trackProgress() {
    double progress = ref.watch(audioControlsViewModel.select(
      (value) => value.progress
    ));
    return LinearProgressIndicator(
      value: progress,
      color: Colors.white,
      backgroundColor: Colors.grey[300]?.withOpacity(0.5),
    );
  }
}