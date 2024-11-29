import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/views/main/widgets/track_player_widget.dart';
import 'package:mobile/widgets/app_navbar.dart';

class MainView extends ConsumerStatefulWidget {
  const MainView({super.key});

  @override
  ConsumerState<MainView> createState() => _MainViewState();
}

class _MainViewState extends ConsumerState<MainView> { 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      extendBodyBehindAppBar: true,
      body: PageView(
        controller: ref.read(mainViewModel).pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: ref.watch(mainViewModel).views.values.toList(),
      ),
      bottomNavigationBar: _navBar(),
      floatingActionButton: Container(padding: const EdgeInsets.only(top: 24), child: const TrackPlayerWidget()),
      floatingActionButtonLocation: FloatingActionButtonLocation.miniCenterFloat,
    );
  }

  Widget _navBar() {
    return AppNavbar(
      onTap: (view) {
        ref.read(mainViewModel).changeView(view);
        if (view == PageMenuSelection.home) {
          ref.read(homeViewModel).run();
        }
      },
      currentView: ref.watch(mainViewModel.select((value) => value.currentView)),
      views: ref.read(mainViewModel).viewInfos,
    );
  }
}