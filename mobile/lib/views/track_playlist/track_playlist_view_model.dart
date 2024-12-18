import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/track_repository.dart';

final trackPlaylistViewModel = ChangeNotifierProvider.autoDispose<TrackPlaylistViewModel>(
  (ref) => TrackPlaylistViewModel(ref),
);

class TrackPlaylistViewModel extends ChangeNotifier {
  TrackPlaylistViewModel(ChangeNotifierProviderRef ref) {
    _trackRepo = ref.read(trackRepoProvider);
  }


  late final TrackRepository _trackRepo;
  List<LibraryModel> playlistsWithTrack = [];
  List<LibraryModel> playlistWithoutTrack = [];

  Future<void> getPlaylistsWithTrack(String trackId) async {
    final resp = await _trackRepo.getPlaylistsWithTrack(trackId);
    playlistsWithTrack = resp.playlistsWithTrack;
    playlistWithoutTrack = resp.playlistsWithoutTrack;
    notifyListeners();
  }
}