import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/genre_remote_data_source.dart';
import 'package:mobile/data/dto/req/add_genres_to_favorite_req.dart';
import 'package:mobile/models/genre_model.dart';

final genreRepoProvider = Provider<GenreRepository>(
  (ref) => GenreRepository(
    genreRemote: ref.read(genreRemoteProvider),
  )
);

class GenreRepository {
  GenreRepository({
    required GenreRemoteDataSource genreRemote
  }) : _genreRemote = genreRemote;

  final GenreRemoteDataSource _genreRemote;

  Future<List<GenreModel>> getGenres() async {
    return await _genreRemote.getGenres();
  }

  Future<bool> addGenresToFavorite({
    required List<GenreModel> favoriteGenres,
  }) async {
    final req = AddGenresToFavoriteReq(favoriteGenres: favoriteGenres);
    return await _genreRemote.addGenresToFavorite(req);
  }

  Future<GenreModel?> getGenre(String genreId) async {
    return await _genreRemote.getGenre(genreId);
  }
}