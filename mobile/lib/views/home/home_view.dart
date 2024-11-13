import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/home/widgets/bighit_track_widget.dart';
import 'package:mobile/views/home/widgets/favorite_genre_widget.dart';
import 'package:mobile/views/home/widgets/recommended_album_widget.dart';
import 'package:mobile/views/home/widgets/suggested_artist_widget.dart';
import 'package:mobile/widgets/base_container.dart';

class HomeView extends ConsumerStatefulWidget {
  const HomeView({super.key});

  @override
  ConsumerState<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends ConsumerState<HomeView> {
  @override
  void initState() {
    super.initState();
    ref.read(homeViewModel).getRecommendAlbums();
    ref.read(homeViewModel).getBighitTracks();
    ref.read(homeViewModel).getSuggestedArtists();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(homeViewModel.select((value) => value.sessionValid), (prev, next) {
      if (!next) {
        context.go('/auth');
      }
    });

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: _appBar(),
      body: _body(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      forceMaterialTransparency: true,
      actions: [
        IconButton(
          icon: const Icon(Icons.logout),
          onPressed: () {
            ref.read(homeViewModel).logout();
          },
        )
      ],
    );
  }

  Widget _body() {
    final sections = [
      _favoriteGenres(),
      _recommendedAlbums(),
      _bighitTracks(),
      _suggestedArtists(),
    ];
    return BaseContainer(
      child: ListView.separated(
        itemCount: sections.length,
        itemBuilder: (context, index) => sections[index],
        separatorBuilder: (context, index) => const SizedBox(height: 40),
      ),
    );
  }

  Widget _baseSection({
    required String title,
    required List<dynamic> items,
    required Widget Function(dynamic) itemWidget,
    Widget placeHolder = const SizedBox.shrink(),
  }) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        items.isNotEmpty
          ? SizedBox(
              height: 200,
              child: ListView.separated(
                shrinkWrap: true,
                scrollDirection: Axis.horizontal,
                itemCount: items.length,
                itemBuilder: (context, index) => itemWidget(items[index]),
                separatorBuilder: (context, index) => const SizedBox(width: 16),
                physics: const AlwaysScrollableScrollPhysics(),
              ),
            )
          : placeHolder,
      ],
    );
  }

  Widget _favoriteGenres() {
    final favoriteGenres = ref.watch(homeViewModel.select(
      (value) => value.favoriteGenres
    ));
    Widget itemWidget(genre) => FavoriteGenreWidget(genre);
    return _baseSection(
      title: 'To get you started',
      items: favoriteGenres,
      itemWidget: itemWidget,
      placeHolder: const Text('No favorite genres added'),
    );
  }

  Widget _recommendedAlbums() {
    final albums = ref.watch(homeViewModel.select(
      (value) => value.recommededAlbums,
    ));
    Widget itemWidget(album) => RecommendedAlbumWidget(album);
    return _baseSection(
      title: "Recommended for today",
      items: albums,
      itemWidget: itemWidget,
      placeHolder: const Text('No recommended albums today'),
    );
  }

  Widget _bighitTracks() {
    final bighitTracks = ref.watch(homeViewModel.select(
      (value) => value.bighitTracks
    ));
    Widget itemWidget(track) => BighitTrackWidget(track);
    return _baseSection(
      title: 'Today\'s biggest hits',
      items: bighitTracks,
      itemWidget: itemWidget,
      placeHolder: const Text('No big hit today'),
    );
  }

  Widget _suggestedArtists() {
    final artists = ref.watch(homeViewModel.select(
      (value) => value.suggestedArtists
    ));
    Widget itemWidget(artist) => SuggestedArtistWidget(artist);
    return _baseSection(
      title: "Suggested artists",
      items: artists,
      itemWidget: itemWidget,
      placeHolder: const Text('No suggested artists today'),
    );
  }
}