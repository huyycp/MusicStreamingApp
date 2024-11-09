import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_playlist/create_playlist_view_model.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/base_container.dart';

class CreatePlaylistView extends ConsumerStatefulWidget {
  const CreatePlaylistView({super.key});

  @override
  ConsumerState<CreatePlaylistView> createState() => _CreatePlaylistViewState();
}

class _CreatePlaylistViewState extends ConsumerState<CreatePlaylistView> {
  @override
  Widget build(BuildContext context) {
    ref.listen(createPlaylistViewModel.select((value) => value.isPlaylistCreated), (prev, next) {
      if (next) {
        context.pop();
        ref.read(libraryViewModel).getPlaylists(refresh: true);
      }
    });

    return Scaffold(
      body: _body(),
    );
  }

  Widget _body() {
    return BaseContainer(
      padding: EdgeInsets.zero,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 36),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              LABEL_COLOR,
              LABEL_COLOR.withOpacity(0.25),
              PRIMARY_BACKGROUND.withOpacity(0.25),
              PRIMARY_BACKGROUND,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          )
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Give your playlist a name',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 48),
            _playlistNameInput(),
            const SizedBox(height: 48),
            _actions(),
          ],
        ),
      ),
    );
  }

  Widget _playlistNameInput() {
    return TextFormField(
      controller: ref.read(createPlaylistViewModel).playlistNameController,
      cursorColor: Colors.white,
      style: Theme.of(context).textTheme.headlineMedium,
      autofocus: true,
      textAlign: TextAlign.center,
      decoration: const InputDecoration(
        fillColor: Colors.transparent,
        border: UnderlineInputBorder(
          borderSide: BorderSide(
            color: BUTTON_STROKE,
          )
        ),
        focusedBorder: UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.white,
          )
        ),
        
      ),
    );
  }

  Widget _actions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _cancelBtn(),
        _createPlaylistBtn(),
      ],
    );
  }

  Widget _cancelBtn() {
    return OutlinedButton(
      onPressed: () {
        context.pop();
      },
      child: const Text('Cancel')
    );
  }

  Widget _createPlaylistBtn() {
    return ElevatedButton(
      onPressed: ref.watch(createPlaylistViewModel.select((value) => value.isValidName)) 
        ? () => ref.read(createPlaylistViewModel).createPlaylist()
        : null,
      child: const Text('Create'),
    );
  }
}