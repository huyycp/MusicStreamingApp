import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/create_track_app_bar.dart';
import 'package:mobile/views/genre/genre_view.dart';
import 'package:mobile/widgets/base_container.dart';

class CreateTrackGenreView extends ConsumerStatefulWidget {
  const CreateTrackGenreView({super.key});

  @override
  ConsumerState<CreateTrackGenreView> createState() => _CreateTrackGenreViewState();
}

class _CreateTrackGenreViewState extends ConsumerState<CreateTrackGenreView> {
  @override
  Widget build(BuildContext context) {
    ref.listen(createTrackViewModel.select((value) => value.isTrackCreatedSuccess), (prev, next) {
      if (next) {
        Navigator.popUntil(context, ModalRoute.withName('main'));
      }
    });

    return Scaffold(
      appBar: createTrackAppBar(),
      body: _body(),
      bottomNavigationBar: _createTrackBtn(),
    );
  }

  Widget _body() {
    return BaseContainer(
      child: GenreView(
        selectedGenres: ref.watch(createTrackViewModel.select(
          (value) => value.pickedGenres
        )),
        onTap: ref.read(createTrackViewModel).togglePickGenre,
      ),
    );
  }

  Widget _createTrackBtn() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: ElevatedButton(
        onPressed: () {
          ref.read(createTrackViewModel).createTrack();
        },
        child: const Text('Create Track'),
      ),
    ); 
  }
}