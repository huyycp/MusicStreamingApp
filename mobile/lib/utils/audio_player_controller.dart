import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mobile/models/track_model.dart';

class AudioPlayerController extends ChangeNotifier {
  AudioPlayerController() {
    _player.positionStream.listen((position) {
      final duration = _player.duration;
      if (duration != null) {
        progress = position.inMilliseconds / duration.inMilliseconds;
        if (progress < 0) progress = 0;
        if (progress > 1) {
          progress = 1;
          _player.pause();
        }
        notifyListeners();
      }
    });
  }

  final _player = AudioPlayer();
  List<TrackModel> _tracks = [];
  double progress = 0;
  int currentIndex = 0;

  List<TrackModel> get tracks => _tracks;
  bool get playing => _player.playing;
  bool get shuffing => _player.shuffleModeEnabled;
  bool get repeating => _player.loopMode == LoopMode.one;
  bool get hasNext => _player.hasNext;
  bool get hasPrev => _player.hasPrevious;

  Future<void> setPlaylist({
    required List<TrackModel> tracks,
    int initialIndex = 0
  }) async {
    _tracks = tracks;
    final playlist = ConcatenatingAudioSource(
      useLazyPreparation: true,
      children: _tracks.map((track) => AudioSource.uri(Uri.parse(track.audioLink))).toList()
    );
    Future.delayed(const Duration(microseconds: 500), () async {
      await _player.setAudioSource(
        playlist,
        initialIndex: initialIndex,
        initialPosition: Duration.zero
      );
      currentIndex = initialIndex;
      if (tracks.isNotEmpty) {
        await _player.play();
      }
      notifyListeners();
    });
  }

  Future<void> selectTrackInPlaylist({required int index}) async {
    if (_player.audioSource == null) {
      return;
    }
    await _player.seek(Duration.zero, index: index);
    currentIndex = index;
    await _player.play();
    notifyListeners();
  }

  Future<void> playOrPause() async {
    if (_player.playing) {
      await _player.pause();
    } else {
      if (progress == 1) {
        await _player.seek(Duration.zero);
      }
      await _player.play();
    }
    notifyListeners();
  }

  Future<void> pause() async {
    await _player.pause();
    notifyListeners();
  }

  Future<void> stop() async {
    _tracks.clear();
    _player.stop();
    currentIndex = 0;
    progress = 0;
    notifyListeners();
  }

  Future<void> handleTrackSlider(double value) async {
    if (value >= 0 && value <= 1) {
      _player.seek(Duration(milliseconds: (value * _player.duration!.inMilliseconds).round()));
      notifyListeners();
    }
  }

  Future<void> toggleShuffle() async {
    _player.setShuffleModeEnabled(!_player.shuffleModeEnabled);
    notifyListeners();
  }

  Future<void> toggleRepeatTrack() async {
    _player.setLoopMode(
      _player.loopMode == LoopMode.off
        ? LoopMode.one
        : LoopMode.off
    );
    notifyListeners();
  }

  Future<void> playNextTrack() async {
    if (_player.hasNext) {
      currentIndex += 1;
      notifyListeners();
      await _player.seekToNext();
    }
  }

  Future<void> playPrevTrack() async {
    if (_player.hasPrevious) {
      currentIndex -= 1;
      notifyListeners();
      await _player.seekToPrevious();
    }
  }
}