import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/create_track_app_bar.dart';
import 'package:mobile/views/genre/genre_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/loading_widget.dart';

class CreateTrackGenreView extends ConsumerStatefulWidget {
  const CreateTrackGenreView({super.key});

  @override
  ConsumerState<CreateTrackGenreView> createState() => _CreateTrackGenreViewState();
}

class _CreateTrackGenreViewState extends ConsumerState<CreateTrackGenreView> {
  @override
  Widget build(BuildContext context) {
    ref.listen(createTrackViewModel.select((value) => value.isTrackCreatedSuccess), (prev, next) {
      if (next == true) {
        Navigator.popUntil(context, ModalRoute.withName('main'));
        ref.read(libraryViewModel).getMyTracks(refresh: true);
      }
    });

    return BaseContainer(
      child: Scaffold(
        appBar: createTrackAppBar(),
        body: _body(),
        bottomNavigationBar: _createTrackBtn(),
        extendBody: true,
      ),
    );
  }

  Widget _body() {
    return GenreView(
      selectedGenres: ref.watch(createTrackViewModel.select((value) => value.trackGenres)),
      onTap: ref.read(createTrackViewModel).selectGenres,
    );
  }

  Widget _createTrackBtn() {
    return BaseButton(
      onPressed: ref.watch(createTrackViewModel.select((value) => value.isValidTrackGenre && value.isTrackCreatedSuccess == false)) 
        ? () {
          ref.read(createTrackViewModel).createTrack();
        }
        : null,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          LoadingWidget(visible: ref.watch(createTrackViewModel.select((value) => value.isTrackCreatedSuccess == null))),
          const Text('Create Track'),
        ],
      ),
    ); 
  }
}