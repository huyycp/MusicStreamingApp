import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/artist_repository.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final homeViewModel = ChangeNotifierProvider<HomeViewModel>(
  (ref) => HomeViewModel(
    userRepo: ref.read(userRepoProvider),
    libraryRepo: ref.read(libraryRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
    artistRepo: ref.read(artistRepoProvider),
  )
);

class HomeViewModel extends ChangeNotifier {
    HomeViewModel({
      required UserRepository userRepo,
      required LibraryRepository libraryRepo,
      required TrackRepository trackRepo,
      required ArtistRepository artistRepo,
    }) : _userRepo = userRepo,
         _libraryRepo = libraryRepo,
         _trackRepo = trackRepo,
         _artistRepo = artistRepo;
  
  final UserRepository _userRepo;
  final LibraryRepository _libraryRepo;
  final TrackRepository _trackRepo;
  final ArtistRepository _artistRepo;

  List<GenreModel> favoriteGenres = [];
  List<LibraryModel> recommededAlbums = [];
  List<UserModel> suggestedArtists = [];
  
  bool sessionValid = true;

  Future<void> logout() async {
    sessionValid = !(await _userRepo.logout());
    notifyListeners();
  }

  Future<void> getFavoriteGenre() async {
    favoriteGenres = _userRepo.user?.favoriteGenres ?? [];
    notifyListeners();
  }

  Future<void> getRecommendAlbums() async {
    final resp = await _libraryRepo.getAlbums(
      pagination: PaginationListReq(
        page: 1,
        limit: 10,
      )
    );
    if (resp != null) {
      recommededAlbums = resp.libraries;
      notifyListeners();
    }
  }

  Future<void> getSuggestedArtists() async {
    final resp = await _artistRepo.getArtists(
      pagination: PaginationListReq(
        page: 1,
        limit: 10,
      )
    );
    if (resp != null) {
      suggestedArtists = resp.artists;
      notifyListeners();
    }
  }
}