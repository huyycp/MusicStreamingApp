import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/manage_tracks_in_library_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';

final detailLibraryViewModel = ChangeNotifierProvider.autoDispose<DetailLibraryViewModel>(
  (ref) => DetailLibraryViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
  ),
);

class DetailLibraryViewModel extends ChangeNotifier {
  DetailLibraryViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo;

  final LibraryRepository _libraryRepo;
  final UserRepository _userRepo;
  LibraryModel? library;
  UserModel? get user => _userRepo.user;
  bool isLoading = true;

  Future<void> getLibrary(String libraryId) async {
    try {
      library = await _libraryRepo.getLibrary(libraryId);
      isLoading = false;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> removeTrackFromPlaylist(TrackModel track) async {
    try {
      RouteConfig.instance.pop();
      final isTrackRemoved = await _libraryRepo.manageTracksInLibrary(
        libraryId: library!.id,
        tracks: [ track ],
        action: ManageTrackActions.del,
      );
      if (isTrackRemoved) {
        SnackBarUtils.showSnackBar(message: 'Remove track success', status: MessageTypes.success);
        getLibrary(library!.id);
      } else {
        SnackBarUtils.showSnackBar(message: 'Remove track failed', status: MessageTypes.error);
      }
    } catch (err) {
      debugPrint(err.toString());
      SnackBarUtils.showSnackBar(message: 'Remove track failed', status: MessageTypes.error);
    }
  }
}