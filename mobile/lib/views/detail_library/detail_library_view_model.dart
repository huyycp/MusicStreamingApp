import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/manage_tracks_in_library_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/genre_repository.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';

final detailLibraryViewModel = ChangeNotifierProvider.autoDispose<DetailLibraryViewModel>(
  (ref) => DetailLibraryViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
    genreRepo: ref.read(genreRepoProvider),
  ),
);

class DetailLibraryViewModel extends ChangeNotifier {
  DetailLibraryViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
    required TrackRepository trackRepo,
    required GenreRepository genreRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo,
       _trackRepo = trackRepo,
       _genreRepo = genreRepo;

  final LibraryRepository _libraryRepo;
  final UserRepository _userRepo;
  final TrackRepository _trackRepo;
  final GenreRepository _genreRepo;

  LibraryModel? library;
  
  UserModel? get user => _userRepo.user;
  bool isLoading = true;

  Future<void> getTrackByGenre(String genreId) async {
    try {
      final resp = await _trackRepo.getTracks(
        pagination: PaginationListReq(limit: 10),
        genreId: genreId,
      );
      final genre = await _genreRepo.getGenre(genreId);
      if (resp != null && genre != null) {
        final tracks = resp.tracks;
        library = LibraryModel(
          id:  genreId,
          name: genre.name,
          imageLink: genre.imageLink,
          type: LibraryType.album,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          tracks: tracks,
          numOfTracks: tracks.length,
        );
        isLoading = false;
        notifyListeners();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

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