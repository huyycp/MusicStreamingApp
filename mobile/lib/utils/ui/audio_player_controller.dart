import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:just_audio_background/just_audio_background.dart';
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
    _player.currentIndexStream.listen((value) {
      currentIndex = value ?? 0;
      notifyListeners();
    });
    _player.playerStateStream.listen((state) {

    });
  }

  final _player = AudioPlayer();
  List<TrackModel> _tracks = [];
  String? currentPlaylist;
  int currentIndex = -1;
  double progress = 0;

  List<TrackModel> get tracks => _tracks;
  TrackModel get currentTrack => tracks[currentIndex];
  bool get playing => _player.playing;
  bool get shuffing => _player.shuffleModeEnabled;
  bool get repeating => _player.loopMode == LoopMode.one;
  bool get hasNext => _player.hasNext;
  bool get hasPrev => _player.hasPrevious;
  bool get available => _player.processingState != ProcessingState.idle;

  Future<void> setPlaylist({
    required List<TrackModel> tracks,
    String? playlistId,
    int initialIndex = 0,
    bool isLibraryPlaying = false,
  }) async {
    if (currentPlaylist == playlistId) {
      if (!isLibraryPlaying) {
        currentIndex = initialIndex;
        notifyListeners();
        await _player.seek(const Duration(seconds: 0), index: currentIndex);
      }
      await _player.play();
    } else {
      _tracks = tracks;
      currentPlaylist = playlistId;
      currentIndex = initialIndex;
      notifyListeners();
      final playlist = ConcatenatingAudioSource(
        useLazyPreparation: true,
        children: _tracks.map(
          (track) => AudioSource.uri(
            Uri.parse(track.audioLink),
            tag: MediaItem(
              id: track.id,
              album: track.album?.name,
              title: track.name,
              artUri: Uri.parse(track.imageLink),
            )
        )).toList()
      );
      await _player.setAudioSource(
        playlist,
        initialIndex: initialIndex,
        initialPosition: Duration.zero
      );
      if (tracks.isNotEmpty) {
        await _player.play();
      }
    }
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
    await _player.stop();
    await _player.seek(const Duration(), index: 0);
    currentPlaylist = null;
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