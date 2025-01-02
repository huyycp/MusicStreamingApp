import 'package:flutter/material.dart';
import 'package:mobile/models/view_info_model.dart';
import 'package:mobile/theme/color_scheme.dart';
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
        type: BottomNavigationBarType.fixed,
        unselectedLabelStyle: const TextStyle(
          color: BUTTON_STROKE
        ),
        selectedLabelStyle: const TextStyle(
          color: Colors.white
        ),
        useLegacyColorScheme: false,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        backgroundColor: Colors.transparent,
        onTap: (index) => widget.onTap(widget.views[index]),
        selectedFontSize: 14,
        unselectedFontSize: 14,
        items: widget.views.map(
          (view) => BottomNavigationBarItem(
            label: view.title,
            backgroundColor: Colors.transparent,
            icon: DynamicImage(view.iconData, width: 20, height: 24, color: BUTTON_STROKE),
            activeIcon: DynamicImage(view.selectedIconData, width: 20, height: 24),
        )).toList()
      )
    );
  }
}