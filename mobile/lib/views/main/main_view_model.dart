import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/utils/ui/audio_player_controller.dart';
import 'package:mobile/views/artist/artist_view.dart';
import 'package:mobile/views/detail_library/detail_library_view.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/library/library_view.dart';
import 'package:mobile/views/profile/profile_view.dart';
import 'package:mobile/views/search/search_view.dart';

final mainViewModel = ChangeNotifierProvider<MainViewModel>(
  (ref) => MainViewModel()
);

final mainAudioController = ChangeNotifierProvider<AudioPlayerController>(
  (ref) => ref.read(mainViewModel).audioController
);

class MainViewModel extends ChangeNotifier {

  final audioController = AudioPlayerController();
  ViewInfoModel currentView = PageMenuSelection.home;
  ViewInfoModel? prevView;
  final pageController = PageController();
  final viewInfos = [
    PageMenuSelection.home,
    PageMenuSelection.search,
    PageMenuSelection.libraries,
    PageMenuSelection.profile,
  ];

  String currentDetailId = '';
  bool isGenre = false;

  Map<ViewInfoModel, Widget> get views => {
    PageMenuSelection.home: const HomeView(),
    PageMenuSelection.search: const SearchView(),
    PageMenuSelection.libraries: const LibraryView(),
    PageMenuSelection.profile: const ProfileView(),
    PageMenuSelection.library: DetailLibraryView(id: currentDetailId, isGenre: isGenre),
    PageMenuSelection.artist: ArtistView(id: currentDetailId),
  };

  void changeView(ViewInfoModel newView) {
    currentView = newView;
    notifyListeners();
    pageController.jumpToPage(
      newView.index,
    );
  }

  void openLibrary({required String id, bool isGenre = false}) {
    currentDetailId = id;
    this.isGenre = isGenre;
    prevView = currentView;
    notifyListeners();
    pageController.jumpToPage(PageMenuSelection.library.index);
  }

  void openArrist(String id) {
    currentDetailId = id;
    prevView = currentView;
    notifyListeners();
    pageController.jumpToPage(PageMenuSelection.artist.index);
  }

  void goBack() {
    if (prevView != null) {
      currentView = prevView!;
      prevView = null;
      currentDetailId = '';
      isGenre = false;
      notifyListeners();
      pageController.jumpToPage(currentView.index);
    }
  }
}

class PageMenuSelection {
  PageMenuSelection._();
  
  static final home = ViewInfoModel(
    title: 'Home',
    iconData: 'assets/icons/ic_home_outlined.svg',
    selectedIconData: 'assets/icons/ic_home_filled.svg',
    path: '/home',
    index: 0,
  );

  static final search =  ViewInfoModel(
    title: 'Search',
    iconData: 'assets/icons/ic_search.svg',
    selectedIconData: 'assets/icons/ic_search_filled.svg',
    path: '/search',
    index: 1,
  );

  static final libraries =  ViewInfoModel(
    title: 'Your Library',
    iconData: 'assets/icons/ic_library_outlined.svg',
    selectedIconData: 'assets/icons/ic_library_filled.svg',
    path: '/library',
    index: 2,
  );

  static final profile = ViewInfoModel(
    title: 'Profile',
    iconData: 'assets/icons/ic_user.svg',
    selectedIconData: 'assets/icons/ic_user_filled.svg',
    path: '/profile',
    index: 3,
  );
  
  static final library = ViewInfoModel(
    title: '',
    iconData: '',
    selectedIconData: '',
    path: '/library',
    index: 4,
  );

  static final artist = ViewInfoModel(
    title: '',
    iconData: '',
    selectedIconData: '',
    path: '/artist',
    index: 5,
  );
}

// final Map<ViewInfoModel, Widget> views = {
//   PageMenuSelection.home: const HomeView(),
//   PageMenuSelection.search: const SearchView(),
//   PageMenuSelection.libraries: const LibraryView(),
//   PageMenuSelection.profile: const ProfileView(),
// };