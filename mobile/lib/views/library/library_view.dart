import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/routes.dart';
import 'package:mobile/views/library/album_list_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/track_list_view.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class LibraryView extends ConsumerStatefulWidget {
  const LibraryView({super.key});

  @override
  ConsumerState<LibraryView> createState() => _LibraryViewState();
}

class _LibraryViewState extends ConsumerState<LibraryView> with TickerProviderStateMixin {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).initTabBar(this);
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBar(),
      body: _body(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Your Library'),
      leading: _userAvatar(),
      actions: _appBarActions(),
      bottom: _tabBar(),
    );
  }

  PreferredSize _tabBar() {
    return PreferredSize(
      preferredSize: const Size.fromHeight(24),
      child: TabBar(
        tabs: ref.read(libraryViewModel).tabs,
        controller: ref.read(libraryViewModel).tabController,
      ),
    );
  }

  Widget _userAvatar() {
    return DynamicImage(
      'assets/images/app_image.png',
      width: 40,
      height: 40,
      isCircle: true,
    );
  }
  
  List<Widget> _appBarActions() {
    return [
      _genresNavBtn(),
      _createAlbumNavBtn(),
      _createProductBtn(),
    ];
  }

  Widget _genresNavBtn() {
    return IconButton(
      onPressed: () {
        context.push('/genres');
      },
      icon: DynamicImage(
        'assets/icons/ic_folder.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _createAlbumNavBtn() {
    return IconButton(
      onPressed: () {
        context.push('/album/create');
      },
      icon: DynamicImage(
        'assets/icons/ic_folder.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _createProductBtn() {
    return IconButton(
      onPressed: () {
        // context.push('/track/create/track-info');
        RouteService.routeConfig.push('/track/create/track-info');
      },
      icon: DynamicImage(
        'assets/icons/ic_add_song.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _body() {
    return BaseContainer(
      padding: EdgeInsets.zero,
      child: TabBarView(
        controller: ref.read(libraryViewModel).tabController,
        children: const [
          AlbumListView(),
          TrackListView(),
        ],
      ),
    );
  }
}