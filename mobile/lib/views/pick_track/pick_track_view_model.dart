import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/manage_tracks_in_library_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_track_resp.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/utils/ui/snackbar.dart';

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
  LibraryModel? library;
  List<TrackModel> pendingTracks = [];
  bool addTrackSuccess = false;
  bool isLoading = true;

  Future<void> getLibrary(String libraryId) async {
    try {
      library = await _libraryRepo.getLibrary(libraryId);
      isLoading = false;
      notifyListeners();
      getPendingTracks();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> getPendingTracks() async {
    try {
      final GetTrackResp? resp;
      if (library!.type == LibraryType.album) {
        resp = await _trackRepo.getTracksByUser(
          pagination: PaginationListReq(
            limit: 20
          ),
          status: TrackLibraryStatus.pending,
        );
      } else {
        resp = await _libraryRepo.getTracksNotInLibrary(
          pagination: PaginationListReq(
            limit: 20,
          ),
          libraryId: library!.id,
        );
      }
      if (resp != null) {
        pendingTracks = resp.tracks;
        notifyListeners();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> addTrackToLibrary(TrackModel track) async {
    try {
      final success = await _libraryRepo.manageTracksInLibrary(
        libraryId: library!.id,
        tracks: [ track ],
        action: ManageTrackActions.add,
      );
      if (success) {
        SnackBarUtils.showSnackBar(message: 'Add track to library success', status: MessageTypes.success);
        getPendingTracks();
      } else {
        SnackBarUtils.showSnackBar(message: 'Add track to library failed', status: MessageTypes.error);
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> removeTrackFromLibrary(TrackModel track) async {
    try {
      final success = await _libraryRepo.manageTracksInLibrary(
        libraryId: library!.id,
        tracks: [ track ],
        action: ManageTrackActions.del,
      );
      if (success) {
        SnackBarUtils.showSnackBar(message: 'Remove track from library success', status: MessageTypes.success);
        getPendingTracks();
      } else {
        SnackBarUtils.showSnackBar(message: 'Remove track from library failed', status: MessageTypes.error);
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}