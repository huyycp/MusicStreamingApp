import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/repositories/album_repository.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/library/library_view.dart';
import 'package:mobile/views/premium/premium_view.dart';
import 'package:mobile/views/search/search_view.dart';

final mainViewModel = ChangeNotifierProvider<MainViewModel>(
  (ref) => MainViewModel()
);

class MainViewModel extends ChangeNotifier {
  MainViewModel() {
    _player.positionStream.listen((position) {
      final duration = _player.duration;
      if (duration != null) {
        progress = position.inMilliseconds / duration.inMilliseconds;
        if (progress < 0) progress = 0;
        if (progress > 1) {
          progress = 1;
          _player.pause();
        }
        LoopMode;
        notifyListeners();
      }
    });
  }

  int currentPage = 0;
  List<ViewInfoModel> viewInfos = [
    ViewInfoModel(
      title: 'Home',
      iconData: 'assets/icons/ic_home_outlined.svg',
      selectedIconData: 'assets/icons/ic_home_filled.svg',
    ),
    ViewInfoModel(
      title: 'Search',
      iconData: 'assets/icons/ic_search_outlined.svg',
      selectedIconData: 'assets/icons/ic_search_filled.svg',
    ),
    ViewInfoModel(
      title: 'Your Library',
      iconData: 'assets/icons/ic_library_outlined.svg',
      selectedIconData: 'assets/icons/ic_library_filled.svg',
    ),
    ViewInfoModel(
      title: 'Premium',
      iconData: 'assets/icons/ic_spotify.svg',
      selectedIconData: 'assets/icons/ic_spotify.svg',
    ),
  ];

  List<Widget> views = [
    HomeView(),
    SearchView(),
    LibraryView(),
    PremiumView(),
  ];

  final _player = AudioPlayer();
  List<TrackModel> _tracks = [];
  double progress = 0;

  bool get playing => _player.playing;
  bool get shuffing => _player.shuffleModeEnabled;
  bool get repeating => _player.loopMode == LoopMode.one;
  bool get hasNext => _player.hasNext;
  bool get hasPrev => _player.hasPrevious;
  List<TrackModel> get tracks => _tracks;
  int currentIndex = 0;

  void changeView(int index) {
    currentPage = index;
    notifyListeners();
  }

  Future<void> setPlaylist({
    required List<TrackModel> tracks,
    int initialIndex = 0
  }) async {
    _tracks = tracks;
    final playlist = ConcatenatingAudioSource(
      useLazyPreparation: true,
      children: _tracks.map((track) => AudioSource.uri(Uri.parse(track.audioLink))).toList()
    );
    await _player.setAudioSource(
      playlist,
      initialIndex: initialIndex,
      initialPosition: Duration.zero
    );
    currentIndex = initialIndex;
    notifyListeners();
    if (tracks.isNotEmpty) {
      await _player.play();
    }
  }

  Future<void> selectTrackInPlaylist({required int index}) async {
    if (_player.audioSource == null && _player.sequence!.length < 0) {
      return;
    }
    await _player.seek(Duration.zero, index: index);
    currentIndex = index;
    notifyListeners();
    await _player.play();
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
  }

  Future<void> stop() async {
    _tracks.clear();
    _player.stop();
    currentIndex = 0;
    progress = 0;
  }

  Future<void> handleTrackSlider(double value) async {
    if (value >= 0 && value <= 1) {
      _player.seek(Duration(milliseconds: (value * _player.duration!.inMilliseconds).round()));
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