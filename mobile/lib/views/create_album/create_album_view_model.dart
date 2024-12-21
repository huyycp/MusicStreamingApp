import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/snackbar.dart';

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
  String? albumImagePath;
  bool isValidInfor = false;
  bool? isAlbumCreated = false;

  Future<void> getLibraryInfo(String id) async {
    final album = await _libraryRepo.getLibrary(id);
    albumImagePath = album?.imageLink;
    albumNameController.text = album?.name ?? '';
    checkValidInfo();
  }

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
        RouteConfig.instance.push('${RouteNamed.library}/${album!.id}');
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

  Future<void> editAlbum(String id, Function(bool) onDone) async {
    try {
      isAlbumCreated = null;
      notifyListeners();
      final album = await _libraryRepo.editLibrary(
        id: id,
        name: albumNameController.text,
        image: albumImage
      );
      if (album != null) {
        albumNameController.text = album.name;
        albumImagePath = album.imageLink;
        albumImage = null;
        notifyListeners();
        onDone(true);
      } else {
        onDone(false);
      }
      isAlbumCreated = false;
      notifyListeners();
    } catch(err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  void checkValidInfo() {
    isValidInfor = (albumImage != null && albumNameController.text.isNotEmpty);
    notifyListeners();
  }
}