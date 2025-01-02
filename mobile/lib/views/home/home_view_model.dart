import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/artist_repository.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/statistic_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final homeViewModel = ChangeNotifierProvider<HomeViewModel>(
  (ref) => HomeViewModel(
    userRepo: ref.read(userRepoProvider),
    libraryRepo: ref.read(libraryRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
    artistRepo: ref.read(artistRepoProvider),
    statisticRepo: ref.read(statisticRepositoryProvider),
  )
);

class HomeViewModel extends ChangeNotifier {
    HomeViewModel({
      required UserRepository userRepo,
      required LibraryRepository libraryRepo,
      required TrackRepository trackRepo,
      required ArtistRepository artistRepo,
      required StatisticRepository statisticRepo,
    }) : _userRepo = userRepo,
         _libraryRepo = libraryRepo,
         _trackRepo = trackRepo,
         _artistRepo = artistRepo,
         _statisticRepo = statisticRepo {
    getFavoriteGenre();
  }
  
  final UserRepository _userRepo;
  final LibraryRepository _libraryRepo;
  final TrackRepository _trackRepo;
  final ArtistRepository _artistRepo;
  final StatisticRepository _statisticRepo;

  List<GenreModel> favoriteGenres = [];
  List<LibraryModel> recommededAlbums = [];
  List<TrackModel> bighitTracks = [];
  List<UserModel> suggestedArtists = [];
  List<UserModel> topArtists = [];
  List<LibraryModel> topAlbums = [];
  
  UserModel? get user => _userRepo.user;

  bool sessionValid = true;

  void run() {
    // getCurrentUser();
    getRecommendAlbums();
    getBighitTracks();
    getSuggestedArtists();
    getTopAlbumsAllTime();
    getTopArtistsAllTime();
  }

  Future<void> logout(Function(bool) onDone) async {
    try {
      sessionValid = !(await _userRepo.logout());
      notifyListeners();
      onDone(sessionValid);
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  Future<void> getCurrentUser() async {
    try {
      await _userRepo.getCurrentUser();
      getFavoriteGenre();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  void getFavoriteGenre() {
    favoriteGenres = _userRepo.user?.favoriteGenres ?? [];
    notifyListeners();
  }

  Future<void> getRecommendAlbums() async {
    try {
      final albums = await _statisticRepo.getTopAlbumsByWeek();
      recommededAlbums = albums;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> getBighitTracks() async {
    try {
      final resp = await _trackRepo.getTracks(
        pagination: PaginationListReq(
          page: 1,
          limit: 10,
        )
      );
      if (resp != null) {
        bighitTracks = resp.tracks;
        notifyListeners();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> getSuggestedArtists() async {
    try {
      final artist = await _statisticRepo.getTopArtistsByWeek();
      suggestedArtists = artist;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> getTopAlbumsAllTime() async {
    try {
      final albums = await _statisticRepo.getTopAlbumsAllTime();
      topAlbums = albums;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }
  
  Future<void> getTopArtistsAllTime() async {
    try {
      final artist = await _statisticRepo.getTopArtistsAllTime();
      topArtists = artist;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}