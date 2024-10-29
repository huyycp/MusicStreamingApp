import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/next_step_button.dart';
import 'package:mobile/widgets/audio_controls/audio_controller.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class CreateTrackAudioView extends ConsumerStatefulWidget {
  const CreateTrackAudioView({super.key});

  @override
  ConsumerState<CreateTrackAudioView> createState() => _CreateTrackAudioViewState();
}

class _CreateTrackAudioViewState extends ConsumerState<CreateTrackAudioView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBar(),
      body: _body(),
      bottomNavigationBar: _nextBtn(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Create track'),
    );
  }

  Widget _body() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Form(
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
      ),
    );
  }

  Widget _audioPicker() {
    return GestureDetector(
      onTap: () {
        ref.read(createTrackViewModel).pickAudio();
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
        (value) => value.audioFile?.name  ?? 'No audio'
      )), 
      textAlign: TextAlign.center,
    );
  }

  Widget _audioPlayer() {
    return Container(
      child: AudioController(
        url: 'https://soundcloud.com/lengocbaogia12/he-n-ga-p-em-o-cuo-c-o-i-kha-c',
      ),
    );
  }

  Widget _nextBtn() {
    return const NextStepButton('/track/create/lyrics');
  }
}