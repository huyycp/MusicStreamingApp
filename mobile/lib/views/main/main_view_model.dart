import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/audio_player_controller.dart';
import 'package:mobile/views/artist/artist_view.dart';
import 'package:mobile/views/detail_library/detail_library_view.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/library/library_view.dart';
import 'package:mobile/views/profile/profile_view.dart';
import 'package:mobile/views/search/search_view.dart';

final mainViewModel = ChangeNotifierProvider.autoDispose<MainViewModel>(
  (ref) => MainViewModel(ref)
);

final mainAudioController = ChangeNotifierProvider<AudioPlayerController>(
  (ref) => ref.read(mainViewModel).audioController
);

class MainViewModel extends ChangeNotifier {
  MainViewModel(ChangeNotifierProviderRef ref) {
    audioController = AudioPlayerController(ref);
  }

  late final AudioPlayerController audioController;
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
    iconData: AppConstantIcons.homeOutlined,
    selectedIconData: AppConstantIcons.homeFilled,
    path: RouteNamed.home,
    index: 0,
  );

  static final search =  ViewInfoModel(
    title: 'Search',
    iconData: AppConstantIcons.search,
    selectedIconData: AppConstantIcons.searchFilled,
    path: RouteNamed.search,
    index: 1,
  );

  static final libraries =  ViewInfoModel(
    title: 'Your Library',
    iconData: AppConstantIcons.libraryOutlined,
    selectedIconData: AppConstantIcons.libraryFilled,
    path: RouteNamed.library,
    index: 2,
  );

  static final profile = ViewInfoModel(
    title: 'Profile',
    iconData: AppConstantIcons.user,
    selectedIconData: AppConstantIcons.userFilled,
    path: RouteNamed.profile,
    index: 3,
  );
  
  static final library = ViewInfoModel(
    title: '',
    iconData: '',
    selectedIconData: '',
    path: RouteNamed.library,
    index: 4,
  );

  static final artist = ViewInfoModel(
    title: '',
    iconData: '',
    selectedIconData: '',
    path: RouteNamed.artist,
    index: 5,
  );
}