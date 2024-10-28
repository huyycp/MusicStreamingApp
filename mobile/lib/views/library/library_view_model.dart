import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/album_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/album_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final libraryViewModel = ChangeNotifierProvider<LibraryViewModel>(
  (ref) => LibraryViewModel(
    albumRepo: ref.read(albumRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
    userRepo: ref.read(userRepoProvider),
  )
);

class LibraryViewModel extends ChangeNotifier {
  LibraryViewModel({
    required AlbumRepository albumRepo,
    required TrackRepository trackRepo,
    required UserRepository userRepo,
  }) : _albumRepo = albumRepo,
       _trackRepo = trackRepo,
       _userRepo = userRepo {
    albumScrollController.addListener(() {
      if (albumScrollController.position.pixels == albumScrollController.position.maxScrollExtent && canLoadAlbums) {
        getAlbums();
      }
    });
    trackScrollController.addListener(() {
      if (trackScrollController.position.pixels == trackScrollController.position.maxScrollExtent && canLoadTracks) {
        getTracks();
      }
    });
  }

  final AlbumRepository _albumRepo;
  final TrackRepository _trackRepo;
  final UserRepository _userRepo;

  List<Tab> tabs = [
    Tab(text: 'Album'),
    Tab(text: 'Track'),
  ];
  TabController? tabController;

  List<AlbumModel> albums = [];
  int albumPage = 1;
  int albumLimit = 10;
  bool canLoadAlbums = false;
  final albumScrollController = ScrollController();

  List<TrackModel> tracks = [];
  int trackPage = 1;
  int trackLimit = 10;
  bool canLoadTracks = false;
  final trackScrollController = ScrollController();

  void initTabBar(TickerProviderStateMixin tickerProviderStateMixin) {
    tabController ??= TabController(
      length: tabs.length,
      vsync: tickerProviderStateMixin
    );
  }
  
  Future<void> getAlbums({bool refresh = false}) async {
    if (refresh) {
      albums.clear();
    }
    final resp = await _albumRepo.getAlbums(
      pagination: PaginationListReq(
        page: albumPage,
        limit: albumLimit,
      )
    );
    if (resp != null) {
      albums = [...albums, ...resp.albums];
      if (resp.meta.currentPage < resp.meta.totalPages) {
        albumPage += 1;
        canLoadAlbums = true;
      } else {
        canLoadAlbums = false;
      }
      notifyListeners();
    }
  }

  Future<void> getTracks({bool refresh = false}) async {
    if (refresh) {
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
      notifyListeners();
    }
  }

  Future<List<TrackModel>> getTracksByAlbum(String id) async {
    final resp = await _albumRepo.getAlbum(id);
    if (resp != null) {
      return resp.tracks;
    }
    return [];
  }
}