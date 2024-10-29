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

  final AlbumRepository _albumRepo;
  final albumNameController = TextEditingController();
  XFile? albumImage;

  bool? isAlbumCreated;
  late String albumId;

  Future<void> pickImage() async {
    final ImagePicker picker = ImagePicker();
    final tempImage = await picker.pickImage(source: ImageSource.gallery);
    if (tempImage != null) {
      albumImage = tempImage;
      notifyListeners();
    }
  }

  Future<void> createAlbum() async {
    final album = await _albumRepo.createAlbum(
      name: albumNameController.text,
      image: albumImage!
    );
    if (album != null) {
      albumId = album.id;
      isAlbumCreated = true;
      notifyListeners();
    }
  }
}