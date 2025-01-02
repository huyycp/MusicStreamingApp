import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/library/base_tab_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/widgets/following_artist.dart';

class ArtistListView extends ConsumerStatefulWidget {
  const ArtistListView({super.key});

  @override
  ConsumerState<ArtistListView> createState() => _ArtistListViewState();
}

class _ArtistListViewState extends ConsumerState<ArtistListView> {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).getFollowingArtists(refresh: true);
  }

  Widget itemWidget(dynamic artist) => FollowingArtist(artist);
  
  @override
  Widget build(BuildContext context) {
    final artists = ref.watch(libraryViewModel.select(
      (value) => value.artists
    ));
    return BaseTabView(
      items: artists,
      itemWidget: itemWidget,
      onRefresh: () => ref.read(libraryViewModel).getFollowingArtists(refresh: true),
      scrollController: ref.read(libraryViewModel).artistScrollController,
      isLoading: ref.watch(libraryViewModel.select((value) => value.isLoadingArtists)),
    );
  }
}