import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/views/home/home_view.dart';
import 'package:mobile/widgets/app_appbar.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';

class TrackPlaylistView extends ConsumerStatefulWidget {
  const TrackPlaylistView({super.key});

  @override
  ConsumerState<TrackPlaylistView> createState() => _TrackPlaylistViewState();
}

class _TrackPlaylistViewState extends ConsumerState<TrackPlaylistView> {
  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  PreferredSize _appBar() {
    return const PreferredSize(
      preferredSize: Size.fromHeight(80),
      child: AppAppbar(
        title: Text('Add to playlist'),
      ),
    );
  }

  Widget _body() {
    return Container(
      child: Column(
        children: [

        ],
      ),
    );
  }

  Widget _createPlaylistBtn() {
    return AppButton(
      onPressed: () {
        context.push('/library/create-playlist');
      },
      child: const Text('New playlist'),
    );
  }
}