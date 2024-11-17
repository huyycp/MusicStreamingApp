import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/modal_bottom_sheet.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/audio_controller_widget.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/track/track_action_sheet.dart';

class TrackPlayerView extends ConsumerStatefulWidget {
  const TrackPlayerView({super.key});

  @override
  ConsumerState<TrackPlayerView> createState() => _TrackPlayerViewState();
}

class _TrackPlayerViewState extends ConsumerState<TrackPlayerView> {  

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 12, right: 16, bottom: 32, left: 16),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [ GRAY_BCK_1, PRIMARY_BACKGROUND ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _topActionsBar(),
          const SizedBox(height: 64),
          _trackImage(),
          const SizedBox(height: 64),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _trackInfo(),
              _favoriteBtn(),
            ],
          ),
          const SizedBox(height: 16),
          _audioController(),
        ],
      ),
    );
  }

  Widget _topActionsBar() {
    return Row(
      children: [
        _escapeBtn(),
        Expanded(child: _albumName()),
        _menuActionsBtn(),
      ],
    );
  }

  Widget _escapeBtn() {
    return IconButton(
      onPressed: () {
        context.pop();
      },
      icon: DynamicImage(
        'assets/icons/ic_chevron_down.svg',
        width: 20,
        height: 20,
      ),
    );
  }

  Widget _albumName() {
    return Text(
      'Album',
      textAlign: TextAlign.center,
      style: Theme.of(context).textTheme.titleMedium,
    );
  }

  Widget _menuActionsBtn() {
    return IconButton(
      onPressed: () {
        showAppModalBottomSheet(
          context: context,
          builder: (context) => TrackActionSheet(
            ref.watch(mainAudioController.select(
              (value) => value.tracks[value.currentIndex]
        ))));
      },
      icon: DynamicImage(
        'assets/icons/ic_menu.svg',
        width: 16,
        height: 16,
      ),
    );
  }

  Widget _trackImage() {
    final imageLink = ref.watch(mainAudioController.select(
      (value) => value.tracks[value.currentIndex]
    )).imageLink;
    return DynamicImage(
      imageLink,
      width: 350,
      height: 350,
    );
  }

  Widget  _trackInfo() {
    final track = ref.watch(mainAudioController.select(
      (value) => value.tracks[value.currentIndex]
    ));
    return Expanded(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            track.name,
            style: Theme.of(context).textTheme.titleLarge,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          Text(
            track.ownerNames,
            style: Theme.of(context).textTheme.bodyMedium,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _favoriteBtn() {
    return IconButton(
      onPressed: () {

      },
      icon: DynamicImage(
        'assets/icons/ic_fav_filled.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _audioController() {
    return AudioPlayerWidget(
      controller: ref.read(mainAudioController),
    );
  }
}