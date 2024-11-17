import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/utils/snackbar.dart';

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
    libraryScrollController.addListener(() {
      if (libraryScrollController.position.pixels == libraryScrollController.position.maxScrollExtent && canLoadLibraries) {
        getLibraries();
      }
    });
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
  UserModel? get user => _userRepo.user;

  List<LibraryModel> libraries = [];
  int libraryPage = 1;
  int libraryLimit = 10;
  bool canLoadLibraries = false;
  bool isLoadingLibraries = true;
  final libraryScrollController = ScrollController();

  List<LibraryModel> albums = [];
  int albumPage = 1;
  int albumLimit = 10;
  bool canLoadAlbums = false;
  bool isLoadingAlbums = true;
  final albumScrollController = ScrollController();

  List<LibraryModel> playlists = [];
  int playlistPage = 1;
  int playlistLimit = 10;
  bool canLoadPlaylists = false;
  bool isLoadingPlaylist = true;
  final playlistScrollController = ScrollController();

  List<TrackModel> tracks = [];
  int trackPage = 1;
  int trackLimit = 10;
  bool canLoadTracks = false;
  bool isLoadingTracks = true;
  final trackScrollController = ScrollController();

  void selectTab(LibraryTabs tab) {
    if ((tab == LibraryTabs.none) || (tab != LibraryTabs.none && currentTab == LibraryTabs.none)) {
      currentTab = tab;
      notifyListeners();
    }
  }

  Future<void> getLibraries({ bool refresh  = false }) async {
    try {
      if (refresh) {
        isLoadingLibraries = true;
        notifyListeners();
        libraryPage = 1;
        if (libraries.isNotEmpty) {
          libraryScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        }
        libraries.clear();
      }
      final resp = await _libraryRepo.getLibraries(
        pagination: PaginationListReq(
          page: libraryPage,
          limit: libraryLimit,
        ),
        sortBy: 'updated_at',
        direction: SortDirection.desc,
      );
      if (resp != null) {
        libraries = [...libraries, ...resp.libraries];
        if (resp.meta.currentPage < resp.meta.totalPages) {
          libraryPage += 1;
          canLoadLibraries = true;
        } else {
          canLoadLibraries = false;
        }
      } else {
        SnackBarUtils.showSnackBar(message: 'Cannot get data. Please check your connection.');
      }
      isLoadingLibraries = false;
      notifyListeners();
    } catch (err) {
      isLoadingLibraries = false;
      notifyListeners();
      debugPrint(err.toString());
    }
  }
  
  Future<void> getAlbums({bool refresh = false}) async {
    try {
      if (refresh) {
        isLoadingAlbums = true;
        notifyListeners();
        albumPage = 1;
        if (albums.isNotEmpty) {
          albumScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        }
        albums.clear();
      }
      final resp = await _libraryRepo.getLibraries(
        pagination: PaginationListReq(
          page: albumPage,
          limit: albumLimit,
        ),
        type: LibraryType.album,
        sortBy: 'updated_at',
        direction: SortDirection.desc,
      );
      if (resp != null) {
        albums = [...albums, ...resp.libraries];
        if (resp.meta.currentPage < resp.meta.totalPages) {
          albumPage += 1;
          canLoadAlbums = true;
        } else {
          canLoadAlbums = false;
        }
      } else {
        SnackBarUtils.showSnackBar(message: 'Cannot get data. Please check your connection again.');
      }
      isLoadingAlbums = false;
      notifyListeners();
    } catch (err) {
      isLoadingAlbums = false;
      notifyListeners();
      debugPrint(err.toString());
    }
  }

  Future<void> getPlaylists({bool refresh = false}) async {
    try {
      if (refresh) {
        isLoadingPlaylist = true;
        notifyListeners();
        playlistPage = 1;
        if (playlists.isNotEmpty) {
          playlistScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        }
        playlists.clear();
      }
      final resp = await _libraryRepo.getLibraries(
        pagination: PaginationListReq(
          page: albumPage,
          limit: albumLimit,
        ),
        type: LibraryType.playlist,
        sortBy: 'updated_at',
        direction: SortDirection.desc,
      );
      if (resp != null) {
        playlists = [...playlists, ...resp.libraries];
        if (resp.meta.currentPage < resp.meta.totalPages) {
          playlistPage += 1;
          canLoadPlaylists = true;
        } else {
          canLoadPlaylists = false;
        }
      } else {
        SnackBarUtils.showSnackBar(message: 'Cannot get data. Please check your connection again');
      }
      isLoadingPlaylist = false;
      notifyListeners();
    } catch (err) {
      isLoadingPlaylist = false;
      notifyListeners();
      debugPrint(err.toString());
    }
  }

  Future<void> getMyTracks({bool refresh = false}) async {
    try {
      if (refresh) {
        isLoadingTracks = true;
        notifyListeners();
        trackPage = 1;
        if (tracks.isNotEmpty) {
          trackScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        }
        tracks.clear();
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
      } else {
        SnackBarUtils.showSnackBar(message: 'Cannot get data. Please check your connection again.');
      }
      isLoadingTracks = false;
      notifyListeners();
    } catch (err) {
      isLoadingTracks = false;
      notifyListeners();
      debugPrint(err.toString());
    }
  }
}

enum LibraryTabs {
  albums,
  playlists,
  tracks,
  artists,
  none,
}