import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/library/widgets/bottom_sheet_item.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class DetailLibraryView extends ConsumerStatefulWidget {
  final String id;
  const DetailLibraryView({required this.id, super.key});

  @override
  ConsumerState<DetailLibraryView> createState() => _DetailLibraryViewState();
}

class _DetailLibraryViewState extends ConsumerState<DetailLibraryView> {
  @override
  void initState() {
    super.initState();
    ref.read(detailLibraryViewModel).getLibrary(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _body(),
    );
  }

  Widget _body() {
    return ref.watch(detailLibraryViewModel.select((value) => !value.isLoading))
      ? Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 30),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              LABEL_COLOR,
              LABEL_COLOR.withOpacity(0.25),
              PRIMARY_BACKGROUND.withOpacity(0.25),
              PRIMARY_BACKGROUND,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          )
        ),
        child: Column(
          children: [
            _appBar(),
            const SizedBox(height: 24),
            Expanded(
              child: Column(
                children: [
                  _playlistInfo(),
                  _playlistActions(),
                  _tracks(),
                ],
              ),
            )
          ],
        ),
      )
    : const Center(child: CircularProgressIndicator());
  }

  Widget _appBar() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _backBtn(),
        const SizedBox(width: 24),
        Expanded(child: _playlistImage()),
        const SizedBox(width: 24),
        const SizedBox(width: 48),
      ],
    );
  }

  Widget _backBtn() {
    return IconButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        context.pop();
      },
      icon: DynamicImage(
        'assets/icons/ic_chevron_left.svg',
        width: 24,
        height: 24,
      ),
    );
  }

  Widget _playlistImage() {
    return AspectRatio(
      aspectRatio: 1,
      child: Container(
        padding: const EdgeInsets.all(100),
        decoration: BoxDecoration(
          color: GRAY_BCK_1.withOpacity(0.60),
          borderRadius: BorderRadius.circular(8),
        ),
        child: DynamicImage(
          'assets/icons/ic_music_note.svg',
          width: 80,
          height: 80,
        ),
      ),
    );
  }

  Widget _playlistInfo() {
    final playlist = ref.watch(detailLibraryViewModel.select((value) => value.library));
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _playlistName(playlist?.name ?? ''),
        const SizedBox(height: 16),
        _playlistOwner(),
        const SizedBox(height: 16),
        _playlistListeningTime(),
      ],
    );
  }

  Widget _playlistName(String name) {
    return Text(
      name,
      style: Theme.of(context).textTheme.headlineMedium,
    );
  }

  Widget _playlistOwner() {
    final owner = ref.watch(detailLibraryViewModel.select(
      (value) => value.user
    ));
    return Row(
      children: [
        DynamicImage(
          owner?.avatarLink ?? '',
          width: 24,
          height: 24,
          isCircle: true,
        ),
        const SizedBox(width: 8),
        Text(
          owner?.name ?? 'user',
          style: Theme.of(context).textTheme.titleMedium,
        )
      ],
    );
  }

  Widget _playlistListeningTime() {
    return Row(
      children: [
        DynamicImage(
          'assets/icons/ic_global_disabled.svg',
          width: 20,
          height: 20,
        ),
      ],
    );
  }

  Widget _playlistActions() {
    return Row(
      children: [
        _downloadBtn(),
        _addOwnersBtn(),
        _moreOptionsBtn(),
        const Spacer(),
        _shuffleBtn(),
        _playBtn(),
      ],
    );
  }

  Widget _downloadBtn() {
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
      child: IconButton(
        padding: EdgeInsets.zero,
        onPressed: () {},
        icon: DynamicImage(
          'assets/icons/ic_download_disabled.svg',
          width: 24,
          height: 24,
        ),
      ),
    );
  }

  Widget _addOwnersBtn() {
    return IconButton(
      onPressed: () {},
      icon: DynamicImage(
        'assets/icons/ic_add_user_disabled.svg',
        width: 30,
        height: 30,
      ),
    );
  }

  Widget _moreOptionsBtn() {
    return IconButton(
      onPressed: () {},
      icon: DynamicImage(
        'assets/icons/ic_menu.svg',
        width: 20,
        height: 20,
      ),
    );
  }

  Widget _shuffleBtn() {
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
      child: IconButton(
        onPressed: () {},
        icon: DynamicImage(
          'assets/icons/ic_shuffle_active.svg',
          width: 24,
          height: 24,
        ),
      ),
    );
  }

  Widget _playBtn() {
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
      child: IconButton(
        onPressed: () {},
        icon: Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: PRIMARY_COLOR,
          ),
          child: DynamicImage(
            'assets/icons/ic_play.svg',
            width: 20,
            height: 20,
            color: PRIMARY_BACKGROUND,
          ),
        ),
      ),
    );
  }

  Widget _tracks() {
    final tracks = ref.watch(detailLibraryViewModel.select(
      (value) => value.library?.tracks ?? []
    ));
    return Expanded(
      child: tracks.isNotEmpty
        ? ListView.separated(
          itemCount: tracks.length,    
          itemBuilder: (context, index) => GestureDetector(
            onTap: () {
              context.push('/track/${tracks[index].id}');
            },
            child: BottomSheetItem(
              iconData: tracks[index].imageLink,
              title: tracks[index].name,
            ),
          ),
          separatorBuilder: (context, state) => const SizedBox(height: 8),
        )
        : _noTracks(),
    );
  }

  Widget _noTracks() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Let\'s start building your playlist',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 24),
        ElevatedButton(
          onPressed: () {
            context.push('/pick-track/${ref.watch(detailLibraryViewModel.select((value) => value.library?.id ?? ''))}');
          },
          child: const Text('Add to this playlist'),
        )
      ],
    );
  }
}