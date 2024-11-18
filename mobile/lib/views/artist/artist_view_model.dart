import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/artist_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final artistViewModel = ChangeNotifierProvider.autoDispose<ArtistViewModel>(
  (ref) => ArtistViewModel(
    artistRepo: ref.read(artistRepoProvider),
    userRepo: ref.read(userRepoProvider),
  )
);

class ArtistViewModel extends ChangeNotifier {
  ArtistViewModel({
    required ArtistRepository artistRepo,
    required UserRepository userRepo
  }) : _artistRepo = artistRepo,
       _userRepo = userRepo;
       
  final ArtistRepository _artistRepo;
  final UserRepository _userRepo;
  UserModel? artist;
  List<LibraryModel> albums = [];
  bool isLoading = true;

  Future<void> getAlbumsByArtist(String artistId) async {
    try {
      artist = await _userRepo.getUser(artistId);
      final resp = await _artistRepo.getAlbumsByArtist(
        pagination: PaginationListReq(limit: 10), 
        artistId: artistId
      );
      if (resp != null && artist != null) {
        albums = resp.libraries;
        if (albums.isNotEmpty) {
          artist = albums.first.owners.first;
        }
      }
      isLoading = false;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}