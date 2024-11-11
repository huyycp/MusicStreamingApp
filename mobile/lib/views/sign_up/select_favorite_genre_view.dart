import 'package:flutter/material.dart';
import 'package:mobile/views/genre/genre_view.dart';
import 'package:mobile/widgets/base_container.dart';

class SelectFavoriteGenreView extends StatefulWidget {
  const SelectFavoriteGenreView({super.key});

  @override
  State<SelectFavoriteGenreView> createState() => _SelectFavoriteGenreViewState();
}

class _SelectFavoriteGenreViewState extends State<SelectFavoriteGenreView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBar(),
      body: _body(),
    );
  }

  AppBar _appBar() {
    return AppBar();
  }

  Widget _body() {
    return BaseContainer(
      child: GenreView(
        selectedGenres: const [],
        onTap: (_) {}
      ),
    );
  }
}