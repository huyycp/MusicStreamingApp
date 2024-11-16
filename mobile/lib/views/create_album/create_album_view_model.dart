import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/utils/snackbar.dart';

final createAlbumViewModel = ChangeNotifierProvider.autoDispose<CreateAlbumViewModel>(
  (ref) => CreateAlbumViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
  )
);

class CreateAlbumViewModel extends ChangeNotifier {
  CreateAlbumViewModel({
    required LibraryRepository libraryRepo,
  }) : _libraryRepo = libraryRepo {
    albumNameController.addListener(checkValidInfo);
  }

  final LibraryRepository _libraryRepo;
  final albumNameController = TextEditingController();
  XFile? albumImage;
  bool isValidInfor = false;
  bool? isAlbumCreated = false;

  Future<void> pickImage() async {
    try {
      final ImagePicker picker = ImagePicker();
      final tempImage = await picker.pickImage(source: ImageSource.gallery);
      if (tempImage != null) {
        albumImage = tempImage;
        checkValidInfo();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> createAlbum() async {
    try {
      isAlbumCreated = null;
      notifyListeners();
      final album = await _libraryRepo.createLibrary(
        name: albumNameController.text,
        image: albumImage!,
        type: LibraryType.album,
      );
      isAlbumCreated = (album != null);
      if (isAlbumCreated == true) {
        RouteConfig.instance.pop();
        RouteConfig.instance.push('/library/${album!.id}');
        SnackBarUtils.showSnackBar(message: 'Create album successfully', status: MessageTypes.success);
      } else {
        SnackBarUtils.showSnackBar(message: 'Create album failed', status: MessageTypes.error);
      }
      notifyListeners();
    } catch (err) {
      isAlbumCreated = false;
      notifyListeners();
      SnackBarUtils.showSnackBar(message: 'Server error, please try again.', status: MessageTypes.error);
    }
  }

  void checkValidInfo() {
    isValidInfor = (albumImage != null && albumNameController.text.isNotEmpty);
    notifyListeners();
  }
}