import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/library_repository.dart';
import 'package:mobile/repositories/user_repository.dart';

final detailLibraryViewModel = ChangeNotifierProvider.autoDispose<DetailLibraryViewModel>(
  (ref) => DetailLibraryViewModel(
    libraryRepo: ref.read(libraryRepoProvider),
    userRepo: ref.read(userRepoProvider),
  ),
);

class DetailLibraryViewModel extends ChangeNotifier {
  DetailLibraryViewModel({
    required LibraryRepository libraryRepo,
    required UserRepository userRepo,
  }) : _libraryRepo = libraryRepo,
       _userRepo = userRepo;

  final LibraryRepository _libraryRepo;
  final UserRepository _userRepo;
  LibraryModel? library;
  UserModel? get user => _userRepo.user;
  bool isLoading = true;

  Future<void> getLibrary(String libraryId) async {
    try {
      library = await _libraryRepo.getLibrary(libraryId);
      isLoading = false;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}