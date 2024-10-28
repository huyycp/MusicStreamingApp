import 'package:flutter/material.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class GenreWidget extends StatelessWidget {
  final GenreModel genre;
  const GenreWidget(this.genre, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _genreImage(),
          const SizedBox(height: 8),
          _genreName(context),
        ],
      ),
    );
  }

  Widget _genreImage() {
    return DynamicImage(
      genre.imageLink,
      isCircle: true,
      width: 70,
      height: 70,
    );
  }

  Widget _genreName(BuildContext context) {
    return Text(
      genre.name,
      style: Theme.of(context).textTheme.titleSmall,
    );
  }
}