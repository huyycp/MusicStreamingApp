import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mobile/models/track_model.dart';

final audioControlsViewModel = ChangeNotifierProvider<AudioControlsViewModel>(
  (ref) => AudioControlsViewModel()
);

class AudioControlsViewModel extends ChangeNotifier {
  AudioControlsViewModel() {
    _player.positionStream.listen((position) {
      final duration = _player.duration;
      if (duration != null) {
        progress = position.inMilliseconds / duration.inMilliseconds;
        notifyListeners();
      }
    });

    
  }

  final _player = AudioPlayer();
  TrackModel? _track;
  double progress = 0;

  bool get playing => _player.playing;
  TrackModel? get track => _track;

  Future<void> setTrack(TrackModel track) async {
    _track = track;
    await _player.setUrl(track.audioLink);
    await _player.play();
    notifyListeners();
  }

  Future<void> playOrPause() async {
    if (_player.playing) {
      await _player.pause();
    } else {
      await _player.play();
    }
    notifyListeners();
  }

  Future<void> stop() async {
    _track = null;
    _player.stop();
    notifyListeners();
  }
}