import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/library/base_tab_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/widgets/library_widget.dart';

class AlbumListView extends ConsumerStatefulWidget {
  const AlbumListView({super.key});

  @override
  ConsumerState<AlbumListView> createState() => _AlbumListViewState();
}

class _AlbumListViewState extends ConsumerState<AlbumListView> {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).getAlbums();
  }

  Widget itemWidget(dynamic album) => LibraryWidget(album);
  
  @override
  Widget build(BuildContext context) {
    final albums = ref.watch(libraryViewModel.select(
      (value) => value.albums
    ));
    return BaseTabView(
      items: albums,
      itemWidget: itemWidget,
      onRefresh: () => ref.read(libraryViewModel).getAlbums(refresh: true),
      scrollController: ref.read(libraryViewModel).albumScrollController,
      isLoading: ref.watch(libraryViewModel.select((value) => value.isLoadingAlbums)),
    );
  }
}