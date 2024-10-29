import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/genre/genre_view_model.dart';
import 'package:mobile/views/genre/widgets/genre_widget.dart';
import 'package:mobile/widgets/base_container.dart';

class GenreView extends ConsumerStatefulWidget {
  final List<String> selectedGenres;
  const GenreView(this.selectedGenres, {super.key});

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
    return _body();
  }

  Widget _body() {
    return BaseContainer(
      child: _genreList(),
    );
  }

  Widget _genreList() {
    final genres = ref.watch(genreViewModel.select(
      (value) => value.genres
    ));
    return GridView.count(
      crossAxisCount: 3,
      children: genres.map(
        (genre) => GenreWidget(genre)
      ).toList(),
    );
  }
}