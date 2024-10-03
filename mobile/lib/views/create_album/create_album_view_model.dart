import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/repositories/album_repository.dart';

final createAlbumViewModel = ChangeNotifierProvider.autoDispose<CreateAlbumViewModel>(
  (ref) => CreateAlbumViewModel(
    albumRepo: ref.read(albumRepoProvider),
  )
);

class CreateAlbumViewModel extends ChangeNotifier {
  CreateAlbumViewModel({
    required AlbumRepository albumRepo,
  }) : _albumRepo = albumRepo;

  AlbumRepository _albumRepo;
  final albumNameController = TextEditingController();
  XFile? albumImage;

  bool? isAlbumCreated;

  Future<void> pickImage() async {
    final ImagePicker picker = ImagePicker();
    final tempImage = await picker.pickImage(source: ImageSource.gallery);
    if (tempImage != null) {
      albumImage = tempImage;
      notifyListeners();
    }
  }

  Future<void> createAlbum() async {
    isAlbumCreated = await _albumRepo.createAlbum(
      name: albumNameController.text,
      image: albumImage!
    );
    notifyListeners();
  }
}