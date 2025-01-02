import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/repositories/genre_repository.dart';

final genreViewModel = ChangeNotifierProvider.autoDispose<GenreViewModel>(
  (ref) => GenreViewModel(
    genreRepo: ref.read(genreRepoProvider),
  )
);

class GenreViewModel extends ChangeNotifier {
  GenreViewModel({
    required GenreRepository genreRepo,
  }) : _genreRepo = genreRepo;

  final GenreRepository _genreRepo;
  List<GenreModel> genres = [];

  Future<void> getGenres() async {
    genres = await _genreRepo.getGenres();
    notifyListeners();
  }
}