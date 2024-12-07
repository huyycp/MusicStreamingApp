import 'package:flutter/material.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AppNavbar extends StatefulWidget {
  const AppNavbar({
    required this.onTap,
    required this.currentView,
    required this.views,
    super.key,
  });
  
  final void Function(ViewInfoModel) onTap;
  final ViewInfoModel currentView;
  final List<ViewInfoModel> views;

  @override
  State<AppNavbar> createState() => _AppNavbarState();
}

class _AppNavbarState extends State<AppNavbar> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.bottomCenter,
          end: Alignment.topCenter,
          colors: [Colors.black, Colors.black.withOpacity(0.05)]
        ),
      ),
      child: BottomNavigationBar(
        currentIndex: widget.currentView.index,
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
        onTap: (index) => widget.onTap(widget.views[index]),
        items: widget.views.map(
          (view) => BottomNavigationBarItem(
            label: view.title,
            backgroundColor: Colors.transparent,
            icon: DynamicImage(view.iconData, width: 24, height: 24),
            activeIcon: DynamicImage(view.selectedIconData, width: 24, height: 24),
        )).toList()
      )
    );
  }
}