import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AudioControllerWidget extends ConsumerStatefulWidget {
  const AudioControllerWidget({super.key});

  @override
  ConsumerState<AudioControllerWidget> createState() => _AudioControllerWidgetState();
}

class _AudioControllerWidgetState extends ConsumerState<AudioControllerWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _trackSlider(),
          const SizedBox(height: 24),
          _trackControls(),
        ],
      ),
    );
  }

  Widget _trackSlider() {
    double progress = ref.watch(mainViewModel.select(
      (value) => value.progress
    ));
    return Slider(
      value: progress,
      thumbColor: Colors.white,
      activeColor: Colors.white,
      allowedInteraction: SliderInteraction.tapAndSlide,
      onChanged: ref.read(mainViewModel).handleTrackSlider
    );
  }

  Widget _trackControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _shuffleBtn(),
        _prevTrackBtn(),
        _playBtn(),
        _nextTrackBtn(),
        _repeatBtn(),
      ],
    );
  }

  Widget _shuffleBtn() {
    final shuffling = ref.watch(mainViewModel.select(
      (value) => value.shuffing
    ));
    return IconButton(
      onPressed: ref.read(mainViewModel).toggleShuffle,
      icon: DynamicImage(
        shuffling
          ? 'assets/icons/ic_shuffle_active.svg'
          : 'assets/icons/ic_shuffle.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _prevTrackBtn() {
    return IconButton(
      onPressed: ref.watch(mainViewModel.select(
        (value) => value.hasPrev
      ))
        ? ref.read(mainViewModel).playPrevTrack
        : null,
      icon: DynamicImage(
        'assets/icons/ic_prev.svg',
        width: 30,
        height: 30,
      ),
    );
  }

  Widget _playBtn() {
    bool playing = ref.watch(mainViewModel.select(
      (value) => value.playing
    ));
    return IconButton(
      onPressed: ref.watch(mainViewModel).playOrPause,
      icon: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
        ),
        child: DynamicImage(
          playing 
            ? 'assets/icons/ic_pause.svg'
            : 'assets/icons/ic_play.svg',
          width: 24,
          height: 24,
          color: PRIMARY_BACKGROUND,
        ),
      ),
    );
  }

  Widget _nextTrackBtn() {
    return IconButton(
      onPressed: ref.watch(mainViewModel.select(
        (value) => value.hasNext
      ))
        ? ref.read(mainViewModel).playNextTrack
        : null,
      icon: DynamicImage(
        'assets/icons/ic_next.svg',
        width: 30,
        height: 30,
      ),
    );
  }

  Widget _repeatBtn() {
    final repeating = ref.watch(mainViewModel.select(
      (value) => value.repeating
    ));
    return IconButton(
      onPressed: ref.read(mainViewModel).toggleRepeatTrack,
      icon: DynamicImage(
        repeating
          ? 'assets/icons/ic_repeat_active.svg'
          : 'assets/icons/ic_repeat.svg',
        width: 24,
        height: 24,
      ),
    );
  }
}