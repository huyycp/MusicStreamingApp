import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/modal_bottom_sheet.dart';
import 'package:mobile/utils/string_format.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/library/album_list_view.dart';
import 'package:mobile/views/library/artist_list_view.dart';
import 'package:mobile/views/library/library_list_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/playlist_list_view.dart';
import 'package:mobile/views/library/track_list_view.dart';
import 'package:mobile/views/library/widgets/bottom_sheet_item.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/navigate_avatar.dart';

class LibraryView extends ConsumerStatefulWidget {
  const LibraryView({super.key});

  @override
  ConsumerState<LibraryView> createState() => _LibraryViewState();
}

class _LibraryViewState extends ConsumerState<LibraryView> with AutomaticKeepAliveClientMixin{
  List<Widget> views = [
    const AlbumListView(),
    const PlaylistListView(),
    const TrackListView(),
    const ArtistListView(),
    Container(),
  ];

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  PreferredSize _appBar() {
    return PreferredSize(
      preferredSize: const Size.fromHeight(124),
      child: AppBar(
        backgroundColor: Colors.transparent,
        title: const Text('Your Library'),
        leading: _userAvatar(),
        actions: _appBarActions(),
        bottom: _tabBar(),
        forceMaterialTransparency: true,
      ),
    );
  }

  Widget _body() {
    final LibraryTabs currentTab = ref.watch(libraryViewModel.select((value) => value.currentTab));
    
    return currentTab == LibraryTabs.none
      ? const LibraryListView()
      : views[ref.watch(libraryViewModel.select((value) => value.currentTab.index))];
  }

  PreferredSize _tabBar() {
    final currentTab = ref.watch(libraryViewModel.select((value) => value.currentTab));
    final currentTabsList = 
      currentTab == LibraryTabs.none
        ? LibraryTabs.values.where((tab) => tab != LibraryTabs.none).toList()
        : LibraryTabs.values.where((tab) => tab == currentTab).toList();

    return PreferredSize(
      preferredSize: const Size.fromHeight(60),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (currentTab != LibraryTabs.none)
            IconButton(
              onPressed: () => ref.read(libraryViewModel).selectTab(LibraryTabs.none),
              icon: Container(
                padding: const EdgeInsets.all(6),
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: GRAY_BCK_1,
                ),
                child: const Icon(Icons.close)),
            ),
          Expanded(
            child: SizedBox(
              height: 48,  // Ensures ListView gets a fixed height
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: currentTabsList.length,
                itemBuilder: (context, index) {
                  return GestureDetector(
                    onTap: () => ref.read(libraryViewModel).selectTab(currentTabsList[index]),
                    child: _tab(currentTabsList[index], currentTab == currentTabsList[index]),
                  );
                },
                separatorBuilder: (context, index) => const SizedBox(width: 4),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _tab(LibraryTabs tab, bool isSelected) {
    return Chip(
      side: BorderSide.none,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(100),
        side: BorderSide.none,
      ),
      backgroundColor: isSelected ? PRIMARY_COLOR : GRAY_BCK_2,
      label: Text(
        tab.name.capitalize(),
        style: Theme.of(context).textTheme.titleSmall?.copyWith(
          color: isSelected ? PRIMARY_BACKGROUND : Colors.white
        )
      ));
  }

  Widget _userAvatar() {
    return NavigateAvatar(
      onTap: () {
        ref.read(mainViewModel).changeView(PageMenuSelection.profile);
      },
      imageSource: ref.watch(homeViewModel.select((value) => value.user?.avatarLink ?? '')),
    );
  }
  
  List<Widget> _appBarActions() {
    return [
      _openAddSheetBtn(),
    ];
  }

  Widget _openAddSheetBtn() {
    return IconButton(
      onPressed: _openAddSheet,
      icon: DynamicImage(
        AppConstantIcons.add,
        width: 24,
        height: 24,
      ),
    );
  }

  void _openAddSheet() {
    showAppModalBottomSheet(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Container(
            padding: const EdgeInsets.only(right: 16, bottom: 24, left: 16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                BottomSheetItem(
                  iconData: AppConstantIcons.addSong,
                  title: 'Track',
                  subtitle: 'Share your music to the world',
                  onPressed: () async {
                    try {
                      if (await ref.watch(userRepoProvider).checkUploadLimit()) {
                        SnackBarUtils.showSnackBar(message: 'Upgrade to premium to upload more tracks');
                      } else {
                        context.pop();
                        context.push(RouteNamed.createTrackInfo);
                      }
                    } catch (e) {
                      SnackBarUtils.showSnackBar(message: 'Server error');
                      debugPrint(e.toString());
                    }
                  },
                ),
                BottomSheetItem(
                  iconData: AppConstantIcons.musicNote,
                  title: 'Playlist',
                  subtitle: 'Build a playlist with songs, or episodes',
                  onPressed: () {
                    context.pop();
                    context.push(RouteNamed.createPlaylist);
                  },
                ),
                BottomSheetItem(
                  iconData: AppConstantIcons.folder,
                  title: 'Album',
                  subtitle: 'Build your album and release to everyone',
                  onPressed: () {
                    context.pop();
                    context.push(RouteNamed.createAlbum);
                  },
                ),
              ],
            ),
          ),
        );
      }
    );
  }
}