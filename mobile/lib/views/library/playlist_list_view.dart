import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/library/base_tab_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/widgets/playlist_widget.dart';

class PlaylistListView extends ConsumerStatefulWidget {
  const PlaylistListView({super.key});

  @override
  ConsumerState<PlaylistListView> createState() => _PlaylistListViewState();
}

class _PlaylistListViewState extends ConsumerState<PlaylistListView> {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).getPlaylists(refresh: true);
  }

  Widget itemWidget(dynamic playlist) => PlaylistWidget(playlist);
  
  @override
  Widget build(BuildContext context) {
    final playlists = ref.watch(libraryViewModel.select(
      (value) => value.playlists
    ));
    return BaseTabView(
      items: playlists,
      itemWidget: itemWidget,
      onRefresh: () => ref.read(libraryViewModel).getPlaylists(refresh: true),
      scrollController: ref.read(libraryViewModel).playlistScrollController,
    );
  }
}