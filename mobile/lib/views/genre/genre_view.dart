import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/views/genre/genre_view_model.dart';
import 'package:mobile/views/genre/widgets/genre_widget.dart';

class GenreView extends ConsumerStatefulWidget {
  final List<GenreModel> selectedGenres;
  final void Function(GenreModel) onTap;
  const GenreView({
    required this.selectedGenres,
    required this.onTap,
    super.key,
  });

  @override
  ConsumerState<GenreView> createState() => _GenreViewState();
}

class _GenreViewState extends ConsumerState<GenreView> {
  @override
  void initState() {
    super.initState();
    ref.read(genreViewModel).getGenres();
  }

  @override
  Widget build(BuildContext context) {
    return _genreList();
  }

  Widget _genreList() {
    final genres = ref.watch(genreViewModel.select(
      (value) => value.genres
    ));
    const double itemW = 100;
    const double itemH = 100 + 20 + 8;
    return GridView.count(
      physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
      crossAxisCount: 3,
      mainAxisSpacing: 4,
      childAspectRatio: itemW / itemH,
      children: genres.map(
        (genre) => GenreWidget(
          genre,
          pickedGenres: widget.selectedGenres,
          onTap: widget.onTap,
        )
      ).toList(),
    );
  }
}