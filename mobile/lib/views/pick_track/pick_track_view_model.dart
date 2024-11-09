import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';

final pickTrackViewModel = ChangeNotifierProvider.autoDispose<PickTrackViewModel>(
  (ref) => PickTrackViewModel(
    trackRepo: ref.read(trackRepoProvider), 
    libraryRepo: ref.read(libraryRepoProvider),
  )
);

class PickTrackViewModel extends ChangeNotifier {
  PickTrackViewModel({
    required TrackRepository trackRepo,
    required LibraryRepository libraryRepo,
  }) : _trackRepo = trackRepo,
       _libraryRepo = libraryRepo;

  final TrackRepository _trackRepo;
  final LibraryRepository _libraryRepo;
  late String _libraryId;
  List<TrackModel> pendingTracks = [];
  bool addTrackSuccess = false;

  void setLibraryId(String libraryId) {
    _libraryId = libraryId;
  }

  Future<void> getPendingTracks() async {
    final resp = await _trackRepo.getTracksByUser(
      pagination: PaginationListReq(
        limit: 10
      ),
      status: TrackStatus.pending,
    );
    if (resp != null) {
      pendingTracks = resp.tracks;
      notifyListeners();
    }
  }

  Future<void> addTrackToPlaylist(TrackModel track) async {
    final success = await _libraryRepo.addTracksToLibrary(
      libraryId: _libraryId,
      tracks: [ track ]
    );
    if (success) {
      await getPendingTracks();
    }
  }
}