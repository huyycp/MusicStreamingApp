import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class FavoriteGenreWidget extends ConsumerWidget {
  final GenreModel genre;
  const FavoriteGenreWidget(this.genre, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        ref.read(mainViewModel).openLibrary(id: genre.id, isGenre: true);
      },
      child: Container(
        width: size,
        height: size,
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: GRAY_BCK_2,
              width: 8,
            )
          )
        ),
        child: Stack(
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
      AppConstantIcons.spotify,
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
        style: Theme.of(context).textTheme.titleLarge,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }
}