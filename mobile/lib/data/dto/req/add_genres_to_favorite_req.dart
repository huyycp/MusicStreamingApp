import 'dart:convert';
import 'package:mobile/models/genre_model.dart';

class AddGenresToFavoriteReq {
  AddGenresToFavoriteReq({
    required this.favoriteGenres,
  });

  List<GenreModel> favoriteGenres;

  Map<String, dynamic> toJson() => {
    'genres': jsonEncode(favoriteGenres.map((genre) => genre.id).toList())
  };
}
