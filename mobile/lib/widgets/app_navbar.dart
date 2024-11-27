import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

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
}

class AppNavbar extends StatefulWidget {
  const AppNavbar({super.key});

  @override
  State<AppNavbar> createState() => _AppNavbarState();
}

class _AppNavbarState extends State<AppNavbar> {
  ViewInfoModel currentView = PageMenuSelection.home; 
  final viewInfos = [
    PageMenuSelection.home,
    PageMenuSelection.search,
    PageMenuSelection.libraries,
    PageMenuSelection.profile,
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.bottomCenter,
          end: Alignment.topCenter,
          colors: [Colors.black, Colors.black.withOpacity(0.5)]
        ),
      ),
      child: BottomNavigationBar(
        currentIndex: currentView.index,
        unselectedLabelStyle: const TextStyle(
          color: Colors.white
        ),
        selectedLabelStyle: const TextStyle(
          color: Colors.white
        ),
        useLegacyColorScheme: false,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        backgroundColor: Colors.transparent,
        onTap: onChangeView,
        items: viewInfos.map(
          (view) => BottomNavigationBarItem(
            label: view.title,
            backgroundColor: Colors.transparent,
            icon: DynamicImage(view.iconData, width: 24, height: 24),
            activeIcon: DynamicImage(view.selectedIconData, width: 24, height: 24),
        )).toList()
      )
    );
  }

  void onChangeView(int index) {
    context.go(viewInfos[index].path);
    setState(() {
      currentView = viewInfos[index];
    });    
  }
}