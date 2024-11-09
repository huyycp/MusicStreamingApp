import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final playlistViewModel = ChangeNotifierProvider.autoDispose<PlaylistViewModel>(
  (ref) => PlaylistViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
  ),
);

class PlaylistViewModel extends ChangeNotifier {
  PlaylistViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo;

  final LibraryRepository _libraryRepo;
  final UserRepository _userRepo;
  LibraryModel? playlist;
  UserModel? user;
  bool isLoading = true;

  Future<void> getPlaylist(String playlistId) async {
    playlist = await _libraryRepo.getLibrary(playlistId);
    user = await _userRepo.getCurrentUser();
    isLoading = false;
    notifyListeners();
  }
}