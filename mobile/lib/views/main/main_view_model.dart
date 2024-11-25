import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/utils/audio_player_controller.dart';

final mainViewModel = ChangeNotifierProvider<MainViewModel>(
  (ref) => MainViewModel()
);

final mainAudioController = ChangeNotifierProvider<AudioPlayerController>(
  (ref) => ref.read(mainViewModel).audioController
);

class MainViewModel extends ChangeNotifier {
  final audioController = AudioPlayerController();
}