import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/create_track_app_bar.dart';
import 'package:mobile/views/create_track/widgets/next_step_button.dart';
import 'package:mobile/widgets/audio_controller_widget.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class CreateTrackAudioView extends ConsumerStatefulWidget {
  const CreateTrackAudioView({super.key});

  @override
  ConsumerState<CreateTrackAudioView> createState() => _CreateTrackAudioViewState();
}

class _CreateTrackAudioViewState extends ConsumerState<CreateTrackAudioView> {
  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: createTrackAppBar(),
        body: _body(),
        bottomNavigationBar: _nextBtn(),
      ),
    );
  }

  Widget _body() {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            'Track audio',
            style: Theme.of(context).textTheme.titleLarge
          ),
          const SizedBox(height: 24),
          _audioPicker(),
          const SizedBox(height: 24),
          _audioName(),
          const SizedBox(height: 36),
          _audioPlayer(),
        ],
      ),
    );
  }

  Widget _audioPicker() {
    return GestureDetector(
      onTap: () {
        ref.read(createTrackViewModel).selectAudio();
      },
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          // color: Colors.amber,
          shape: BoxShape.circle,
          border: Border.all(
            width: 1,
            color: BUTTON_STROKE,
          ),
        ),
        child: Transform.rotate(
          angle: 0,
          alignment: Alignment.center,

          child: DynamicImage(
            'assets/images/default_audio_picker.png',
            width: 150,
            height: 150,
            isCircle: true,
          ),
        ),
      ),
    );
  }

  Widget _audioName() {
    return Text(
      ref.watch(createTrackViewModel.select(
        (value) => value.trackAudio?.name  ?? 'No audio'
      )), 
      textAlign: TextAlign.center,
    );
  }

  Widget _audioPlayer() {
    return  AudioPlayerWidget(
      controller: ref.read(createTrackViewModel).audioController,
      isRepeatEnabled: false,
      isShuffingEnabled: false,
    );
  }

  Widget _nextBtn() {
    return NextStepButton(
      destination: '/track/create/lyrics',
      extraAction: () => ref.read(createTrackViewModel).audioController.pause(),
      enabled: ref.watch(createTrackViewModel.select((value) => value.isValidTrackAudio)),
    );
  }
}