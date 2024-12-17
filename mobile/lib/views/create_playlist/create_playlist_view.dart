import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/snackbar.dart';
import 'package:mobile/views/create_playlist/create_playlist_view_model.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';

class CreatePlaylistView extends ConsumerStatefulWidget {
  const CreatePlaylistView({this.id, super.key});
  final String? id;

  @override
  ConsumerState<CreatePlaylistView> createState() => _CreatePlaylistViewState();
}

class _CreatePlaylistViewState extends ConsumerState<CreatePlaylistView> {
  @override
  void initState() {
    super.initState();
    if (widget.id != null) ref.read(createPlaylistViewModel).getPlaylistInfo(widget.id!);
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvoked: (_) {
        ref.read(libraryViewModel)
          ..getLibraries(refresh: true)
          ..getPlaylists(refresh: true);
      },
      child: Scaffold(
        body: _body(),
      ),
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
    return AppButton(
      onPressed: () {
        context.pop();
      },
      type: ButtonType.outlined,
      border: ButtonBorder.round,
      isPrimary: false,
      child: const Text('Cancel')
    );
  }

  Widget _createPlaylistBtn() {
    return AppButton(
      onPressed: ref.watch(createPlaylistViewModel.select((value) => value.isValidName)) 
        ? widget.id == null
          ? () => ref.read(createPlaylistViewModel).createPlaylist()
          : () => ref.read(createPlaylistViewModel).editPlaylist(widget.id!, (isDone) {
            if (isDone) {
              context.pop();
              SnackBarUtils.showSnackBar(message: 'Edit playlist successfully', status: MessageTypes.success);
              ref.read(detailLibraryViewModel).getLibrary(widget.id!);
            } else {
              SnackBarUtils.showSnackBar(message: 'Edit playlist failed', status: MessageTypes.error);
            }
          })
        : null,
      isPrimary: true,
      border: ButtonBorder.round,
      type: ButtonType.elevated,
      child: Text(widget.id == null ? 'Create' : 'Save'),
    );
  }
}