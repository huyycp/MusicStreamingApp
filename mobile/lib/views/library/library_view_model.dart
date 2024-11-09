import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final libraryViewModel = ChangeNotifierProvider<LibraryViewModel>(
  (ref) => LibraryViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
  )
);

class LibraryViewModel extends ChangeNotifier {
  LibraryViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo {
    albumScrollController.addListener(() {
      if (albumScrollController.position.pixels == albumScrollController.position.maxScrollExtent && canLoadAlbums) {
        getAlbums();
      }
    });
  }

  final LibraryRepository _libraryRepo;
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
  
  Future<void> getAlbums({bool refresh = false}) async {
    if (refresh) {
      albums.clear();
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
  artists,
  none,
}