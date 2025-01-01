import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/modal_bottom_sheet.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/views/detail_library/widgets/library_action_sheet.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/track/track_widget.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class DetailLibraryView extends ConsumerStatefulWidget {
  final String id;
  final bool isGenre;
  const DetailLibraryView({
    required this.id,
    this.isGenre = false,
    super.key,
  });

  @override
  ConsumerState<DetailLibraryView> createState() => _DetailLibraryViewState();
}

class _DetailLibraryViewState extends ConsumerState<DetailLibraryView> {
  @override
  void initState() {
    super.initState();
    if (widget.isGenre) {
      ref.read(detailLibraryViewModel).getTrackByGenre(widget.id);
    } else {
      ref.read(detailLibraryViewModel).getLibrary(widget.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvoked: (_) {
        ref.read(libraryViewModel)
          ..getLibraries(refresh: true)
          ..getAlbums(refresh: true)
          ..getPlaylists(refresh: true);
      },
      child: Scaffold(
        extendBodyBehindAppBar: true,
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      leading: ref.watch(mainViewModel.select((value) => value.prevView != null))
        ? IconButton(
            onPressed: () => ref.read(mainViewModel).goBack(),
            icon: const Icon(Icons.arrow_back),
          )
        : null,
      forceMaterialTransparency: true,
    );
  }

  Widget _body() {
    return ref.watch(detailLibraryViewModel.select((value) => !value.isLoading))
      ? Container(
        height: MediaQuery.sizeOf(context).height,
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
        child: SingleChildScrollView(
          child: Column(
            children: [
              _playlistImage(),
              const SizedBox(height: 24),
              _playlistInfo(),
              _playlistActions(),
              _addTrackBtn(),
              const SizedBox(height: 16),
              _tracks(),
            ],
          ),
        ),
      )
    : const Center(child: CircularProgressIndicator());
  }

  Widget _playlistImage() {
    final library = ref.watch(detailLibraryViewModel.select(
      (value) => value.library
    ));
    return Container(
      width: 250,
      height: 250,
      padding: (library!.type == LibraryType.album || (library.type == LibraryType.playlist && library.tracks.isNotEmpty)) ? EdgeInsets.zero : const EdgeInsets.all(100),
      decoration: BoxDecoration(
        color: GRAY_BCK_1.withOpacity(0.60),
        borderRadius: BorderRadius.circular(8),
      ),
      child: library.type == LibraryType.album 
        ? DynamicImage(
            library.imageLink,
            width: 280,
            height: 280,
            borderRadius: BorderRadius.circular(4),
          )
        : library.tracks.isNotEmpty
          ? DynamicImage(
              library.tracks.first.imageLink,
              width: 280,
              height: 280,
              borderRadius: BorderRadius.circular(4),
            )
          : DynamicImage(
            AppConstantIcons.musicNote,
            width: 80,
            height: 80,
            borderRadius: BorderRadius.circular(4),
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
        // _playlistListeningTime(),
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
    final library = ref.watch(detailLibraryViewModel.select(
      (value) => value.library
    ));
    return Visibility(
      visible: !widget.isGenre,
      child: Row(
        children: [
          DynamicImage(
            widget.isGenre ? '' : library?.owners.first.avatarLink ?? '',
            width: 24,
            height: 24,
            isCircle: true,
          ),
          const SizedBox(width: 8),
          Text(
            library?.ownersName ?? 'user',
            style: Theme.of(context).textTheme.titleMedium,
          )
        ],
      ),
    );
  }

  Widget _playlistActions() {
    return Row(
      children: [
        _downloadBtn(),
        _addOwnersBtn(),
        _moreOptionsBtn(),
        const Spacer(),
        // _shuffleBtn(),
        _playBtn(),
      ],
    );
  }

  Widget _downloadBtn() {
    return Visibility(
      visible: 
        ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)) &&
        (ref.watch(userRepoProvider).user?.isPremium ?? false ) == true,
      child: IconButton(
        padding: EdgeInsets.zero,
        onPressed: () {},
        icon: DynamicImage(
          AppConstantIcons.downloadDisabled,
          width: 24,
          height: 24,
        ),
      ),
    );
  }

  Widget _addOwnersBtn() {
    final library = ref.watch(detailLibraryViewModel.select((value) => value.library)); 
    return Visibility(
      visible: 
        library?.type == LibraryType.album && 
        library != null && library.owners.where((owner) => ref.watch(userRepoProvider).user?.id == owner.id).isNotEmpty &&
        !widget.isGenre,
      child: IconButton(
        onPressed: () {},
        icon: DynamicImage(
          AppConstantIcons.addUserDisabled,
          width: 30,
          height: 30,
        ),
      ),
    );
  }

  Widget _moreOptionsBtn() {
    return IconButton(
      onPressed: () {
        showAppModalBottomSheet(context: context, builder: (context) {
          return LibraryActionSheet(
            id: widget.id,
            type: ref.watch(detailLibraryViewModel.select(
              (value) => value.library?.type ?? LibraryType.playlist)
            ),
          );
        });
      },
      icon: DynamicImage(
        AppConstantIcons.menu,
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
          AppConstantIcons.shuffleActive,
          width: 24,
          height: 24,
        ),
      ),
    );
  }

  Widget _playBtn() {
    final isPlaying = ref.watch(mainAudioController.select(
      (value) => value.playing && value.currentPlaylist == widget.id)
    );
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
      child: IconButton(
        onPressed: () => isPlaying ? _pauseLibrary() : _playLibrary(isLibraryPlaying: true),
        icon: Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: PRIMARY_COLOR,
          ),
          child: DynamicImage(
            isPlaying
              ? AppConstantIcons.pause
              : AppConstantIcons.play,
            width: 20,
            height: 20,
            color: PRIMARY_BACKGROUND,
          ),
        ),
      ),
    );
  }

  Widget _addTrackBtn() {
    final tracks = ref.watch(detailLibraryViewModel.select(
      (value) => value.library?.tracks ?? []
    ));
    final isPlaylist = ref.watch(detailLibraryViewModel.select(
      (value) => value.library?.type)) == LibraryType.playlist;
    return Visibility(
      visible: tracks.isNotEmpty && ref.watch(detailLibraryViewModel.select((value) => value.library?.type)) == LibraryType.playlist,
      child: GestureDetector(
        onTap: () {
          context.push('${RouteNamed.pickTrack}/${ref.watch(detailLibraryViewModel.select((value) => value.library!.id))}');
        },
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              color: GRAY_BCK_1,
              padding: const EdgeInsets.all(16),
              child: DynamicImage(
                AppConstantIcons.add,
                width: 24,
                height: 24,
                color: BUTTON_STROKE,
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Add to this playlist',
                style: Theme.of(context).textTheme.titleMedium,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _tracks() {
    final tracks = ref.watch(detailLibraryViewModel.select(
      (value) => value.library?.tracks ?? []
    ));
    return tracks.isNotEmpty
      ? ListView.separated(
          padding: const EdgeInsets.only(bottom: 48),
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: tracks.length,    
          itemBuilder: (context, index) => TrackWidget(
            tracks[index],
            isMenuVisible: true,
            onPressed: () => _playLibrary(index: index),
          ),
          separatorBuilder: (context, state) => const SizedBox(height: 16),
        )
      : _noTracks();
  }

  Widget _noTracks() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Let\'s start building your playlist',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 24),
        AppButton(
          border: ButtonBorder.round,
          onPressed: () {
            context.push('${RouteNamed.pickTrack}/${ref.watch(detailLibraryViewModel.select((value) => value.library?.id ?? ''))}');
          },
          child: const Text('Add to this playlist'),
        )
      ],
    );
  }

  void _playLibrary({int index = 0, bool isLibraryPlaying = false}) {
    ref.read(mainAudioController).setPlaylist(
      tracks: ref.watch(detailLibraryViewModel.select((value) => value.library!.tracks)),
      initialIndex: index,
      playlistId: ref.watch(detailLibraryViewModel.select((value) => value.library!.id)),
      isLibraryPlaying: isLibraryPlaying,
    );
  }

  void _pauseLibrary() {
    ref.read(mainAudioController).pause();
  }
}