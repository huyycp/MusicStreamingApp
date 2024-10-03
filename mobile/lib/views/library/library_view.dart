import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class LibraryView extends StatefulWidget {
  const LibraryView({super.key});

  @override
  State<LibraryView> createState() => _LibraryViewState();
}

class _LibraryViewState extends State<LibraryView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBar(),
      body: Center(
        child: Text('Library'),
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Your Library'),
      leading: _userAvatar(),
      actions: _appBarActions(),
    );
  }

  Widget _userAvatar() {
    return DynamicImage(
      'assets/images/app_image.png',
      width: 40,
      height: 40,
      isCircle: true,
    );
  }
  
  List<Widget> _appBarActions() {
    return [
      _createAlbumNavBtn(),
      _createProductBtn(),
    ];
  }

  Widget _createAlbumNavBtn() {
    return IconButton(
      onPressed: () {
        context.push('/album/create');
      },
      icon: DynamicImage(
        'assets/icons/ic_folder.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _createProductBtn() {
    return IconButton(
      onPressed: () {
        context.push('/track/create/track-info');
      },
      icon: DynamicImage(
        'assets/icons/ic_add_song.svg',
        width: 24,
        height: 24,
      ),
    );
  }
}