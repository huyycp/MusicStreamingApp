import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/manage_tracks_in_library_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';

final trackPlaylistViewModel = ChangeNotifierProvider.autoDispose<TrackPlaylistViewModel>(
  (ref) => TrackPlaylistViewModel(ref),
);

class TrackPlaylistViewModel extends ChangeNotifier {
  TrackPlaylistViewModel(ChangeNotifierProviderRef ref) {
    _trackRepo = ref.read(trackRepoProvider);
    _libraryRepo = ref.read(libraryRepoProvider);
  }

  late final TrackRepository _trackRepo;
  late final LibraryRepository _libraryRepo;
  List<LibraryModel> playlistsWithTrack = [];
  List<LibraryModel> playlistWithoutTrack = [];
  List<bool> selectStatus = [];

  Future<void> getPlaylistsWithTrack(String trackId) async {
    final resp = await _trackRepo.getPlaylistsWithTrack(trackId);
    playlistsWithTrack = resp.playlistsWithTrack;
    playlistWithoutTrack = resp.playlistsWithoutTrack;
    selectStatus.addAll(List.generate(playlistsWithTrack.length, (index) => true));
    selectStatus.addAll(List.generate(playlistWithoutTrack.length, (index) => false));
    notifyListeners();
  }

  void toggleSelectPlaylist(int index) {
    selectStatus[index] = !selectStatus[index];
    selectStatus = [...selectStatus];
    notifyListeners();
  }

  Future<void> managePlaylists(String trackId, Function(bool) onDone) async {
    try {
      final playlists = [...playlistsWithTrack, ...playlistWithoutTrack];
      final track = await _trackRepo.getTrack(id: trackId);
      await Future.wait(
        
        playlists.indexed.map((value) => _libraryRepo.manageTracksInLibrary(
          libraryId: value.$2.id,
          tracks: [ track! ]
        ))
       
      );
      onDone(true);
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }
}