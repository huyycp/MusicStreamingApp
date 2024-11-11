import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/utils/snackbar.dart';

final createAlbumViewModel = ChangeNotifierProvider.autoDispose<CreateAlbumViewModel>(
  (ref) => CreateAlbumViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
  )
);

class CreateAlbumViewModel extends ChangeNotifier {
  CreateAlbumViewModel({
    required LibraryRepository libraryRepo,
  }) : _libraryRepo = libraryRepo;

  final LibraryRepository _libraryRepo;
  final albumNameController = TextEditingController();
  XFile? albumImage;
  bool isValidInfor = false;
  bool? isAlbumCreated = false;

  Future<void> pickImage() async {
    final ImagePicker picker = ImagePicker();
    final tempImage = await picker.pickImage(source: ImageSource.gallery);
    if (tempImage != null) {
      albumImage = tempImage;
      notifyListeners();
    }
  }

  Future<void> createAlbum() async {
    isAlbumCreated = null;
    notifyListeners();
    isAlbumCreated = await _libraryRepo.createLibrary(
      name: albumNameController.text,
      image: albumImage!,
      type: LibraryType.album,
    );
    if (isAlbumCreated == true) {
      SnackBarService.showSnackBar(message: 'Create album successfully', status: MessageTypes.success);
    } else {
      SnackBarService.showSnackBar(message: 'Create album failed', status: MessageTypes.error);
    }
    notifyListeners();
  }

  void checkValidInfo() {
    isValidInfor = (albumImage != null && albumNameController.text.isNotEmpty);
  }
}