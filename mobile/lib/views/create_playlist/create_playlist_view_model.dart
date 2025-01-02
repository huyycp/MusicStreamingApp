import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/snackbar.dart';

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

  Future<void> getPlaylistInfo(String id) async {
    try {
      final playlist = await _libraryRepo.getLibrary(id);
      if (playlist != null) {
        playlistNameController.text = playlist.name;
        checkValidName();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }
  
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
        RouteConfig.instance.push('${RouteNamed.library}/${playlist!.id}');
        SnackBarUtils.showSnackBar(message: 'Create playlist success', status: MessageTypes.success);
      } else {
        SnackBarUtils.showSnackBar(message: 'Create playlist failed', status: MessageTypes.error);
      }
    } catch (err) {
      SnackBarUtils.showSnackBar(message: 'Server error, please try again', status: MessageTypes.error);
    }
  }

  Future<void> editPlaylist(String id, Function(bool) onDone) async {
    try {
      final playlist = await _libraryRepo.editLibrary(
        id: id,
        name: playlistNameController.text,
      );
      if (playlist != null) {
        onDone(true);
      } else {
        onDone(false);
      }
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  void checkValidName() {
    isValidName = playlistNameController.text.isNotEmpty;
    notifyListeners();
  }
}