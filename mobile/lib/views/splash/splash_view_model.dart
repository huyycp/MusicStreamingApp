import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';

final splashViewModel = ChangeNotifierProvider.autoDispose<SplashViewModel>(
  (ref) => SplashViewModel(ref.read(userRepoProvider))
);

class SplashViewModel extends ChangeNotifier {
  SplashViewModel(UserRepository userRepo) {
    _userRepo = userRepo;
  }

  late final UserRepository _userRepo;

  bool isInitialized = false;
  bool isValidSession = false;
  bool isEpxiredRefreshToken = false;

  Future<void> init() async {
    try {
      isValidSession = (await _userRepo.loadAccessToken()) && (await _userRepo.isValidRefreshToken());
      isInitialized = true;
      debugPrint('Initialized');
      notifyListeners();
    } catch (err) {
      debugPrint('Init app error: ${err.toString()}');
    }
  }
}