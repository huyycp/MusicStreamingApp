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
import 'package:mobile/utils/ui/snackbar.dart';

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
      if (libraryScrollController.position.pixels == libraryScrollController.position.maxScrollExtent - 100 && canLoadLibraries) {
        getLibraries();
      }
    });
    albumScrollController.addListener(() {
      if (albumScrollController.position.pixels == albumScrollController.position.maxScrollExtent - 100 && canLoadAlbums) {
        getAlbums();
      }
    });
    playlistScrollController.addListener(() {
      if (playlistScrollController.position.pixels == playlistScrollController.position.maxScrollExtent - 100 && canLoadPlaylists) {
        getPlaylists();
      }
    });
    trackScrollController.addListener(() {
      if (trackScrollController.position.pixels == trackScrollController.position.maxScrollExtent - 100 && canLoadTracks) {
        getMyTracks();
      }
    });
    artistScrollController.addListener(() {
      if (artistScrollController.position.pixels == artistScrollController.position.maxScrollExtent - 100 && canLoadArtists) {
        getFollowingArtists();
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

  List<UserModel> artists = [];
  int artistPage = 1;
  int artistLimit = 10;
  bool canLoadArtists = false;
  bool isLoadingArtists = true;
  final artistScrollController = ScrollController();

  void selectTab(LibraryTabs tab) {
    if ((tab == LibraryTabs.none) || (tab != LibraryTabs.none && currentTab == LibraryTabs.none)) {
      currentTab = tab;
      notifyListeners();
    }
  }

  Future<void> getLibraries({ bool refresh  = false }) async {
    try {
      if (refresh) {
        if (libraries.isNotEmpty) {
          libraryPage = 1;
          libraryScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
          libraries.clear();
        }
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
        if (albums.isNotEmpty) {
          albumPage = 1;
          albumScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
          albums.clear();
        }
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
        if (playlists.isNotEmpty) {
          playlistPage = 1;
          playlistScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
          playlists.clear();
        }
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
        if (tracks.isNotEmpty) {
          trackPage = 1;
          trackScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
          tracks.clear();
        }
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

  Future<void> getFollowingArtists({bool refresh = false}) async {
    try {
      if (refresh) {
        if (artists.isNotEmpty) {
          artistPage = 1;
          artistScrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
          artists.clear();
        }
      }
      final resp = await _userRepo.getFollowingArtists(
        pagination: PaginationListReq(
          page: artistPage,
          limit: artistLimit,
        ),
      );
      if (resp != null) {
        artists = [...artists, ...resp.artists];
        if (resp.meta.currentPage < resp.meta.totalPages) {
          artistPage += 1;
          canLoadArtists = true;
        } else {
          canLoadArtists = false;
        }
      } else {
        SnackBarUtils.showSnackBar(message: 'Cannot get data. Please check your connection again.');
      }
      isLoadingArtists = false;
      notifyListeners();
    } catch (err) {
      isLoadingArtists = false;
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