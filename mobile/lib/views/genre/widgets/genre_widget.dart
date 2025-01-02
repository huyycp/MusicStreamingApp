import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class GenreWidget extends ConsumerWidget {
  final GenreModel genre;
  final List<GenreModel> pickedGenres;
  final void Function(GenreModel) onTap;
  const GenreWidget(
    this.genre, {
    required this.pickedGenres,
    required this.onTap,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () => onTap(genre),
      child: Stack(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _genreImage(ref),
                const SizedBox(height: 8),
                _genreName(context),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _genreImage(WidgetRef ref) {
    bool isPicked = pickedGenres.contains(genre);
    return Stack(
      children: [
        DynamicImage(
          genre.imageLink,
          width: 100,
          height: 100,
          isCircle: true,
        ),
        if (isPicked) 
          Positioned(
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white,
              ),
              child: const Icon(Icons.check, color: GRAY_BCK_1,)
            ),
          )
      ],
    );
  }

  Widget _genreName(BuildContext context) {
    return Text(
      genre.name,
      style: Theme.of(context).textTheme.titleSmall,
    );
  }
}