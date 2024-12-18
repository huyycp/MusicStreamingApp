import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/audio_player_controller.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AudioPlayerWidget extends ConsumerStatefulWidget {
  final ChangeNotifierProvider<AudioPlayerController> notifier;
  final bool isShuffingEnabled;
  final bool isRepeatEnabled;
  AudioPlayerWidget({
    required AudioPlayerController controller,
    this.isRepeatEnabled = true,
    this.isShuffingEnabled = true,
    super.key,
  }) : notifier = ChangeNotifierProvider<AudioPlayerController>(
        (ref) => controller
      );

  @override
  ConsumerState<AudioPlayerWidget> createState() => _AudioPlayerWidgetState();
}

class _AudioPlayerWidgetState extends ConsumerState<AudioPlayerWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _trackSlider(),
        const SizedBox(height: 24),
        _trackControls(),
      ],
    );
  }

  Widget _trackSlider() {
    return Slider(
      value: ref.watch(widget.notifier.select((value) => value.progress)),
      thumbColor: Colors.white,
      activeColor: Colors.white,
      allowedInteraction: SliderInteraction.tapAndSlide,
      onChanged: ref.read(widget.notifier).handleTrackSlider
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
    final isShuffing = ref.watch(widget.notifier.select((value) => value.shuffing));
    return IconButton(
      onPressed: widget.isShuffingEnabled
        ? ref.read(widget.notifier).toggleShuffle
        : null,
      icon: DynamicImage(
        isShuffing
          ? 'assets/icons/ic_shuffle_active.svg'
          : 'assets/icons/ic_shuffle.svg',
        width: 24,
        height: isShuffing ? 30 : 24,
        color: widget.isShuffingEnabled ? Colors.white : GRAY_BCK_2,
      ),
    );
  }

  Widget _prevTrackBtn() {
    bool hasPrev = ref.watch(widget.notifier.select((value) => value.hasPrev));
    return IconButton(
      onPressed: hasPrev
        ? ref.read(widget.notifier).playPrevTrack
        : null,
      icon: DynamicImage(
        'assets/icons/ic_prev.svg',
        width: 30,
        height: 30,
        color: hasPrev ? Colors.white : GRAY_BCK_2,
      ),
    );
  }

  Widget _playBtn() {
    return IconButton(
      onPressed: ref.read(widget.notifier).playOrPause,
      icon: Container(
        padding: const EdgeInsets.all(12),
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
        ),
        child: DynamicImage(
          ref.watch(widget.notifier.select((value) => value.playing)) 
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
    bool hasNext = ref.watch(widget.notifier.select((value) => value.hasNext));
    return IconButton(
      onPressed: hasNext
        ? ref.read(widget.notifier).playNextTrack
        : null,
      icon: DynamicImage(
        'assets/icons/ic_next.svg',
        width: 30,
        height: 30,
        color: hasNext ? Colors.white : GRAY_BCK_2,
      ),
    );
  }

  Widget _repeatBtn() {
    final isRepeating = ref.watch(widget.notifier.select((value) => value.repeating));
    return IconButton(
      onPressed: widget.isRepeatEnabled
        ? ref.read(widget.notifier).toggleRepeatTrack
        : null,
      icon: DynamicImage(
        isRepeating
          ? 'assets/icons/ic_repeat_active.svg'
          : 'assets/icons/ic_repeat.svg',
        width: 24,
        height: isRepeating ? 30 : 24,
        color: widget.isRepeatEnabled ? Colors.white : GRAY_BCK_2,
      ),
    );
  }
}