import 'package:flutter/material.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class FavoriteGenreWidget extends StatelessWidget {
  final GenreModel genre;
  const FavoriteGenreWidget(this.genre, {super.key});
  final double size = 120;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size + 20,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: GRAY_BCK_2,
            width: 5,
          )
        )
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Stack(
            children: [
              Positioned.fill(
                child: _genreImage(),
              ),
              Positioned.fill(child: _overlay()),
              Positioned(
                top: 10,
                left: 10,
                child: _icSpotify(),
              ),
              Positioned(
                bottom: 20,
                child: _genreName(context),
              )
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'artists...',
            style: Theme.of(context).textTheme.bodyMedium,
          )
        ],
      ),
    );
  }

  Widget _genreImage() {
    return DynamicImage(
      genre.imageLink,
      width: size,
      height: size,
    );
  }

  Widget _overlay() {
    return Container(color: Colors.grey.withOpacity(0.05));
  }

  Widget _icSpotify() {
    return DynamicImage(
      'assets/icons/ic_spotify.svg',
      width: 12,
      height: 12,
    );
  }

  Widget _genreName(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 30, right: 10),
      decoration: const BoxDecoration(
        border: Border(
          left: BorderSide(
            color: GRAY_BCK_2,
            width: 5,
          )
        )
      ),
      child: Text(
        genre.name,
        style: Theme.of(context).textTheme.titleMedium,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }
}