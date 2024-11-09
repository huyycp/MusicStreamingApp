import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';

final createPlaylistViewModel = ChangeNotifierProvider.autoDispose<CreatePlaylistViewModel>(
  (ref) => CreatePlaylistViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
  ),
);

class CreatePlaylistViewModel extends ChangeNotifier {
  CreatePlaylistViewModel({
    required LibraryRepository libraryRepo,
  }) : _libraryRepo = libraryRepo {
    playlistNameController.addListener(checkValidName);
  }

  final LibraryRepository _libraryRepo;
  final playlistNameController = TextEditingController();
  bool isPlaylistCreated = false;
  bool isValidName = false;
  
  Future<void> createPlaylist() async {
    isPlaylistCreated = await _libraryRepo.createLibrary(
      name: playlistNameController.text,
      type: LibraryType.playlist,
    );
    notifyListeners();
  }

  void checkValidName() {
    isValidName = playlistNameController.text.isNotEmpty;
    notifyListeners();
  }
}