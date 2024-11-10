import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/utils/audio_player_controller.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/views/library/library_view.dart';
import 'package:mobile/views/premium/premium_view.dart';
import 'package:mobile/views/search/search_view.dart';

final mainViewModel = ChangeNotifierProvider<MainViewModel>(
  (ref) => MainViewModel()
);

final mainAudioController = ChangeNotifierProvider<AudioPlayerController>(
  (ref) => ref.read(mainViewModel).audioController
);

class MainViewModel extends ChangeNotifier {

  int currentPage = 0;
  List<ViewInfoModel> viewInfos = [
    ViewInfoModel(
      title: 'Home',
      iconData: 'assets/icons/ic_home_outlined.svg',
      selectedIconData: 'assets/icons/ic_home_filled.svg',
    ),
    ViewInfoModel(
      title: 'Search',
      iconData: 'assets/icons/ic_search.svg',
      selectedIconData: 'assets/icons/ic_search_filled.svg',
    ),
    ViewInfoModel(
      title: 'Your Library',
      iconData: 'assets/icons/ic_library_outlined.svg',
      selectedIconData: 'assets/icons/ic_library_filled.svg',
    ),
    ViewInfoModel(
      title: 'Premium',
      iconData: 'assets/icons/ic_spotify.svg',
      selectedIconData: 'assets/icons/ic_spotify.svg',
    ),
  ];

  List<Widget> views = [
    const HomeView(),
    const SearchView(),
    const LibraryView(),
    const PremiumView(),
  ];

  final audioController = AudioPlayerController();
  
  void changeView(int index) {
    currentPage = index;
    notifyListeners();
  }
}