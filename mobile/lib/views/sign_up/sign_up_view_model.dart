import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/repositories/genre_repository.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/snackbar.dart';

final signUpViewModel = ChangeNotifierProvider.autoDispose<SignUpViewModel>(
  (ref) => SignUpViewModel(ref.read(userRepoProvider), ref.read(genreRepoProvider))
);

class SignUpViewModel extends ChangeNotifier{
  SignUpViewModel(UserRepository userRepo, GenreRepository genreRepo) {
    _userRepo = userRepo;
    _genreRepo = genreRepo;
  }

  late final UserRepository _userRepo;
  late final GenreRepository _genreRepo;

  final emailFormKey = GlobalKey<FormState>();
  final passwordFormKey = GlobalKey<FormState>();
  final genderFormKey = GlobalKey<FormState>();
  final nameFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final genderController = TextEditingController(text: 'Male');
  final nameController = TextEditingController();
  UserRole userRole = UserRole.listener;
  List<GenreModel> favoriteGenres = [];

  bool verifySuccess = false;
  bool registerSuccess = false;
  bool? isGenresAdded = false;
  List<String> availableEmails = [''];

  void changeUserRole(UserRole? value) {
    if (value == null || value == userRole) return;
    userRole = value;
    notifyListeners();
  }

  Future<void> registerWithEmail() async {
    registerSuccess = await _userRepo.registerWithEmail(
      email: emailController.text,
      password: passwordController.text,
      gender: genderController.text,
      name: nameController.text,
      role: userRole,
    );
    notifyListeners();
  } 

  Future<void> getAuthOTP() async {
    await _userRepo.getAuthOTP(emailController.text);
  }

  Future<void> verifyEmail(String otp) async {
    verifySuccess = await _userRepo.verifyEmail(
      email: emailController.text, 
      otp: otp
    );
    notifyListeners();
  }

  Future<void> getAvailableEmails() async {
    availableEmails = await _userRepo.getAvailableEmails();
    notifyListeners();
  }

  void clear() {
    emailController.clear();
    passwordController.clear();
    genderController.clear();
    nameController.clear();
    userRole = UserRole.listener;
    verifySuccess = false;
    registerSuccess = false;
  }

  void selectFavoriteGenres(GenreModel genre) {
    if (favoriteGenres.contains(genre)) {
      favoriteGenres.remove(genre);
      favoriteGenres = [...favoriteGenres];
    } else {
      favoriteGenres = [...favoriteGenres, genre];
    }
    notifyListeners();
  }

  Future<void> addGenresToFavorite() async {
    try {
      isGenresAdded = null;
      notifyListeners();
      isGenresAdded = await _genreRepo.addGenresToFavorite(favoriteGenres: favoriteGenres);
      if (isGenresAdded == true) {
        RouteConfig.instance.go('/main');
      } else if (isGenresAdded == false) {
        SnackBarUtils.showSnackBar(message: 'Add favorite genres failed');
      }
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
      isGenresAdded = false;
      notifyListeners();
    }
  }
}
