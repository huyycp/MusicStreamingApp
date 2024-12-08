import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/library_repository.dart';

final trackPlayerWidgetModel = ChangeNotifierProvider<TrackPlayerWidgetModel>(
  (ref) => TrackPlayerWidgetModel(ref)
);

class TrackPlayerWidgetModel extends ChangeNotifier{
  TrackPlayerWidgetModel(ChangeNotifierProviderRef ref) {
    _libraryRepo = ref.read(libraryRepoProvider);
  }

  late final LibraryRepository _libraryRepo;
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
}