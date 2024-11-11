import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final libraryViewModel = ChangeNotifierProvider<LibraryViewModel>(
  (ref) => LibraryViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
  )
);

class LibraryViewModel extends ChangeNotifier {
  LibraryViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
    required TrackRepository trackRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo,
       _trackRepo = trackRepo {
    albumScrollController.addListener(() {
      if (albumScrollController.position.pixels == albumScrollController.position.maxScrollExtent && canLoadAlbums) {
        getAlbums();
      }
    });
    playlistScrollController.addListener(() {
      if (playlistScrollController.position.pixels == playlistScrollController.position.maxScrollExtent && canLoadPlaylists) {
        getPlaylists();
      }
    });
    trackScrollController.addListener(() {
      if (trackScrollController.position.pixels == trackScrollController.position.maxScrollExtent && canLoadTracks) {
        getMyTracks();
      }
    });
  }

  final LibraryRepository _libraryRepo;
  final TrackRepository _trackRepo;
  final UserRepository _userRepo;

  LibraryTabs currentTab = LibraryTabs.none;

  void selectTab(LibraryTabs tab) {
    if ((tab == LibraryTabs.none) || (tab != LibraryTabs.none && currentTab == LibraryTabs.none)) {
      currentTab = tab;
      notifyListeners();
    }
  }

  List<LibraryModel> albums = [];
  int albumPage = 1;
  int albumLimit = 10;
  bool canLoadAlbums = false;
  final albumScrollController = ScrollController();

  List<LibraryModel> playlists = [];
  int playlistPage = 1;
  int playlistLimit = 10;
  bool canLoadPlaylists = false;
  final playlistScrollController = ScrollController();

  List<TrackModel> tracks = [];
  int trackPage = 1;
  int trackLimit = 10;
  bool canLoadTracks = false;
  final trackScrollController = ScrollController();
  
  Future<void> getAlbums({bool refresh = false}) async {
    if (refresh) {
      albums.clear();
      albumPage = 1;
    }
    final resp = await _libraryRepo.getLibraries(
      pagination: PaginationListReq(
        page: albumPage,
        limit: albumLimit,
      ),
      type: LibraryType.album,
    );
    if (resp != null) {
      albums = [...albums, ...resp.libraries];
      if (resp.meta.currentPage < resp.meta.totalPages) {
        albumPage += 1;
        canLoadAlbums = true;
      } else {
        canLoadAlbums = false;
      }
      notifyListeners();
    }
  }

  Future<void> getPlaylists({bool refresh = false}) async {
    if (refresh) {
      playlists.clear();
      playlistPage = 1;
    }
    final resp = await _libraryRepo.getLibraries(
      pagination: PaginationListReq(
        page: albumPage,
        limit: albumLimit,
      ),
      type: LibraryType.playlist,
    );
    if (resp != null) {
      playlists = [...playlists, ...resp.libraries];
      if (resp.meta.currentPage < resp.meta.totalPages) {
        playlistPage += 1;
        canLoadPlaylists = true;
      } else {
        canLoadPlaylists = false;
      }
      notifyListeners();
    }
  }

  Future<void> getMyTracks({bool refresh = false}) async {
    if (refresh) {
      tracks.clear();
      trackPage = 1;
    }
    final resp = await _trackRepo.getTracksByUser(
      pagination: PaginationListReq(
        page: trackPage,
        limit: trackLimit,
      ),
    );
    if (resp != null) {
      tracks = [...tracks, ...resp.tracks];
      if (resp.meta.currentPage < resp.meta.totalPages) {
        trackPage += 1;
        canLoadTracks = true;
      } else {
        canLoadTracks = false;
      }
      notifyListeners();
    }
  }

  Future<List<TrackModel>> getTracksByLibrary(String id) async {
    final library = await _libraryRepo.getLibrary(id);
    if (library != null) {
      return library.tracks;
    }
    return [];
  }
}

enum LibraryTabs {
  albums,
  playlists,
  tracks,
  artists,
  none,
}