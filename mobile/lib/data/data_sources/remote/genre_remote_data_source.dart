import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/models/genre_model.dart';

final genreRemoteProvider = Provider<GenreRemoteDataSource>(
  (ref) => GenreRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider),
  )
);

class GenreRemoteDataSource {
  GenreRemoteDataSource({
    required MagicMusicApi magicMusicApi,
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _genrePath = '/genres';

  Future<List<GenreModel>> getGenres() async {
    final response = await _magicMusicApi.request(
      _genrePath,
      method: HttpMethods.GET,
    );
    
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return List.from(data.map(
          (genreJson) => GenreModel.fromJson(genreJson)
        ));
      }
    }
    return List.empty();
  }
}