import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';

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
    try {
      final playlist = await _libraryRepo.createLibrary(
        name: playlistNameController.text,
        type: LibraryType.playlist,
      );
      isPlaylistCreated = (playlist != null);
      notifyListeners();
      if (isPlaylistCreated) {
        RouteConfig.instance.pop();
        RouteConfig.instance.push('/library/${playlist!.id}');
        SnackBarUtils.showSnackBar(message: 'Create playlist success', status: MessageTypes.success);
      } else {
        SnackBarUtils.showSnackBar(message: 'Create playlist failed', status: MessageTypes.error);
      }
    } catch (err) {
      SnackBarUtils.showSnackBar(message: 'Server error, please try again', status: MessageTypes.error);
    }
  }

  void checkValidName() {
    isValidName = playlistNameController.text.isNotEmpty;
    notifyListeners();
  }
}