import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/widgets/status_dialog_widget.dart';

class HomeView extends ConsumerStatefulWidget {
  const HomeView({super.key});

  @override
  ConsumerState<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends ConsumerState<HomeView> {
  @override
  Widget build(BuildContext context) {
    ref.listen(homeViewModel.select((value) => value.sessionValid), (prev, next) {
      if (!next) {
        context.go('/auth');
      }
    });

    return Scaffold(
      appBar: _appBar(),
      body: Center(
        child: const Text('Home'),
      )
    );
  }

  AppBar _appBar() {
    return AppBar(
      actions: [
        IconButton(
          icon: const Icon(Icons.logout),
          onPressed: () {
            ref.read(homeViewModel).logout();
            showDialog(
              context: context, 
              builder: (context) => StatusDialogWidget('Logging out...')
            );
          },
        )
      ],
    );
  }
}