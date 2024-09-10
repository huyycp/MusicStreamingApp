import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';

final homeViewModel = ChangeNotifierProvider<HomeViewModel>(
  (ref) => HomeViewModel(ref.read(userRepoProvider))
);

class HomeViewModel extends ChangeNotifier {
  HomeViewModel(UserRepository userRepo) {
    _userRepo = userRepo;
  }
  
  late final UserRepository _userRepo;

  bool sessionValid = true;

  Future<void> logout() async {
    sessionValid = !(await _userRepo.logout());
    notifyListeners();
  }
}