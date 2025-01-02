import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/views/track_playlist/track_playlist_view_model.dart';
import 'package:mobile/views/track_playlist/widgets/playlist_choice_widget.dart';
import 'package:mobile/widgets/app_appbar.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';

class TrackPlaylistView extends ConsumerStatefulWidget {
  const TrackPlaylistView(this.trackId, {super.key});
  final String trackId;

  @override
  ConsumerState<TrackPlaylistView> createState() => _TrackPlaylistViewState();
}

class _TrackPlaylistViewState extends ConsumerState<TrackPlaylistView> {
  @override
  void initState() {
    super.initState();
    ref.read(trackPlaylistViewModel).getPlaylistsWithTrack(widget.trackId);
  }

  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
        bottomNavigationBar: _doneBtn(),
      ),
    );
  }

  PreferredSize _appBar() {
    return const PreferredSize(
      preferredSize: Size.fromHeight(80),
      child: AppAppbar(
        title: Text('Add to playlist'),
      ),
    );
  }

  Widget _body() {
    return SingleChildScrollView(
      child: Column(
        children: [
          _playlistsWithTrack(),
          const SizedBox(height: 32),
          _playlistsWithoutTrack(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _createPlaylistBtn() {
    return AppButton(
      onPressed: () {
        context.push(RouteNamed.createPlaylist);
      },
      child: const Text('New playlist'),
    );
  }

  Widget _playlistsWithTrack() {
    final playlists = ref.watch(trackPlaylistViewModel.select(
      (value) => value.playlistsWithTrack
    ));
    final selectedPlaylists = ref.watch(trackPlaylistViewModel.select(
      (value) => value.selectStatus
    ));
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text('Saved in', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 12),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: playlists.length,
          itemBuilder: (context, index) => PlaylistChoiceWidget(
            playlists[index],
            isSelected: selectedPlaylists[index],
            onTap: () => ref.read(trackPlaylistViewModel).toggleSelectPlaylist(index),
          ),
          separatorBuilder: (context, index) => const SizedBox(height: 16),
        ),
      ],
    );
  }

  Widget _playlistsWithoutTrack() {
    final offset = ref.watch(trackPlaylistViewModel.select(
      (value) => value.playlistsWithTrack.length
    ));
    final playlists = ref.watch(trackPlaylistViewModel.select(
      (value) => value.playlistWithoutTrack
    ));
    final selectedPlaylists = ref.watch(trackPlaylistViewModel.select(
      (value) => value.selectStatus
    ));
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text('Available playlists', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 12),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: playlists.length,
          itemBuilder: (context, index) => PlaylistChoiceWidget(
            playlists[index],
            isSelected: selectedPlaylists[offset + index],
            onTap: () => ref.read(trackPlaylistViewModel).toggleSelectPlaylist(offset + index),
          ),
          separatorBuilder: (context, index) => const SizedBox(height: 16),
        ),
      ],
    );
  }

  Widget _doneBtn() {
    return AppButton(
      onPressed: () {
        ref.read(trackPlaylistViewModel).managePlaylists(widget.trackId, (isDone) {
          if (isDone) {
            SnackBarUtils.showSnackBar(message: 'Manage track successfully', status: MessageTypes.success);
            context.pop();
          } else {
            SnackBarUtils.showSnackBar(message: 'Manage track failed', status: MessageTypes.error);
          }
        });
      },
      isPrimary: true,
      child: const Text('Done'),
    );
  }
}