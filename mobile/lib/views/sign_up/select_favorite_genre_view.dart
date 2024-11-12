import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/genre/genre_view.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/loading_widget.dart';

class SelectFavoriteGenreView extends ConsumerStatefulWidget {
  const SelectFavoriteGenreView({super.key});

  @override
  ConsumerState<SelectFavoriteGenreView> createState() => _SelectFavoriteGenreViewState();
}

class _SelectFavoriteGenreViewState extends ConsumerState<SelectFavoriteGenreView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      appBar: _appBar(),
      body: _body(),
      bottomNavigationBar: _addFavoriteGenresBtn(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      leading: const SizedBox.shrink(),
      centerTitle: false,
      leadingWidth: 0,
      title: Text(
        'Choose at least 3 genres to start with',
        style: Theme.of(context).textTheme.titleLarge,
      ),
    );
  }

  Widget _body() {
    return BaseContainer(
      child: GenreView(
        selectedGenres: ref.watch(signUpViewModel.select((value) => value.favoriteGenres)),
        onTap: (genre) => ref.read(signUpViewModel).selectFavoriteGenres(genre),
      ),
    );
  }

  Widget _addFavoriteGenresBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          )
        ),
        onPressed: ref.watch(signUpViewModel.select((value) => value.favoriteGenres.length >= 3 && value.isGenresAdded == false))
          ? () => ref.read(signUpViewModel).addGenresToFavorite()
          : null,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            LoadingWidget(
              visible: ref.watch(signUpViewModel.select((value) => value.isGenresAdded == null)), 
            ),
            const Text('Confirm'),
          ],
        )
      ),
    );
  }
} 