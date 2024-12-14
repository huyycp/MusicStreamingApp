import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/user_repository.dart';

final editProfileViewModel = ChangeNotifierProvider.autoDispose<EditProfileViewModel>(
  (ref) => EditProfileViewModel(ref)
);

class EditProfileViewModel extends ChangeNotifier {
  EditProfileViewModel(ChangeNotifierProviderRef ref) {
    _userRepo = ref.read(userRepoProvider);
    getUserInfo();
  }

  late final UserRepository _userRepo;
  UserModel? get user => _userRepo.user;
  XFile? image;
  String? imagePath;
  final nameController = TextEditingController();
  
  void getUserInfo() {
    nameController.text = user?.name ?? '';
  }

  Future<void> editProfile(Function(bool) onDone) async {
    try {
      final user = await _userRepo.editProfile(
        name: nameController.text,
        image: image,
      );
      onDone(user != null);
    } catch (err) {
      onDone(false);
      debugPrint(err.toString());
    }
  }

  Future<void> pickImage() async {
    final imagePicker = ImagePicker();
    final result = await imagePicker.pickImage(source: ImageSource.gallery);
    if (result != null) {
      image = result;
      notifyListeners();
    }
  }
}