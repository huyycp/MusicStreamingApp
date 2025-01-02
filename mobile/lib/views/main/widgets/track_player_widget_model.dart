import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';

final trackPlayerWidgetModel = ChangeNotifierProvider<TrackPlayerWidgetModel>(
  (ref) => TrackPlayerWidgetModel(ref)
);

class TrackPlayerWidgetModel extends ChangeNotifier{
  TrackPlayerWidgetModel(ChangeNotifierProviderRef ref) {
    _libraryRepo = ref.read(libraryRepoProvider);
    _trackRepo = ref.read(trackRepoProvider);
  }

  late final LibraryRepository _libraryRepo;
  late final TrackRepository _trackRepo;
  bool isFavorite = false;

  Future<void> addTracksToFavorite(String trackId, Function(bool?) onDone) async {
    try {
      final result = await _libraryRepo.addTracksToFavorite([ trackId ]);
      isFavorite = result;
      notifyListeners();
      onDone(result);
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  Future<void> removeTrackFromFavorite(String trackId, Function(bool?) onDone) async {
    try {
      final result = await _libraryRepo.removeTrackFromFavorite([ trackId ]);
      isFavorite = result;
      notifyListeners();
      onDone(result);
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  Future<void> checkFavoriteTrack(String trackId) async {
    try {
      isFavorite = await _trackRepo.isFavoriteTrack(trackId);
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}