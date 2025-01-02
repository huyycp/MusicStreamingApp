import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/views/artist/artist_view_model.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/views/library/widgets/library_widget.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class ArtistView extends ConsumerStatefulWidget {
  final String id;
  const ArtistView({
    required this.id,
    super.key,
  });

  @override
  ConsumerState<ArtistView> createState() => _ArtistViewState();
}

class _ArtistViewState extends ConsumerState<ArtistView> {
  @override
  void initState() {
    super.initState();
    ref.read(artistViewModel).getAlbumsByArtist(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: _appBar(),
      body: _body(),
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
    return ref.watch(artistViewModel.select((value) => !value.isLoading))
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
              _artistImage(),
              const SizedBox(height: 24),
              _artistInfo(),
              _albumsActions(),
              const SizedBox(height: 16),
              _albums(),
              const SizedBox(height: 70),
            ],
          ),
        ),
      )
    : const Center(child: CircularProgressIndicator());
  }

  Widget _artistImage() {
    final artist = ref.watch(artistViewModel.select(
      (value) => value.artist
    ));
    return Container(
      width: 250,
      height: 250,
      decoration: BoxDecoration(
        color: GRAY_BCK_1.withOpacity(0.60),
        borderRadius: BorderRadius.circular(8),
      ),
      child: DynamicImage(
        artist?.avatarLink  ?? '',
        width: 280,
        height: 280,
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }

  Widget _artistInfo() {
    final artist = ref.watch(artistViewModel.select(
      (value) => value.artist
    ));
    return Row(
      children: [
        DynamicImage(
          artist?.avatarLink ?? '',
          width: 24,
          height: 24,
          isCircle: true,
        ),
        const SizedBox(width: 8),
        Text(
          artist?.name ?? 'user',
          style: Theme.of(context).textTheme.titleMedium,
        )
      ],
    );
  }

  Widget _albumsActions() {
    return Row(
      children: [
        _followBtn(),
        _downloadBtn(),
        _moreOptionsBtn(),
        const Spacer(),
        // _shuffleBtn(),
        // _playBtn(),
      ],
    );
  }

  Widget _followBtn() {
    final isFollowed = ref.watch(artistViewModel.select(
      (value) => value.isFollowed
    ));
    return Visibility(
      visible: ref.watch(userRepoProvider.select((value) => value.user?.id != widget.id)),
      child: IconButton(
        onPressed: () {
          ref.read(artistViewModel).followArtist(widget.id, (isDone) {
            if (isDone == null) {
              SnackBarUtils.showSnackBar(message: 'Something wrong', status: MessageTypes.error);
              return;
            }
            if (isDone) {
              SnackBarUtils.showSnackBar(message: 'Follow successfully', status: MessageTypes.success);
            } else {
              SnackBarUtils.showSnackBar(message: 'Unfollow successfully', status: MessageTypes.success);
            }
          });
        },
        icon: DynamicImage(
          isFollowed ? AppConstantIcons.favFilled : AppConstantIcons.favOutlined,
          width: 24,
          height: 24,
        ),
      ),
    );
  }

  Widget _downloadBtn() {
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
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
    return IconButton(
      onPressed: () {},
      icon: DynamicImage(
        AppConstantIcons.addUserDisabled,
        width: 30,
        height: 30,
      ),
    );
  }

  Widget _moreOptionsBtn() {
    return IconButton(
      onPressed: () {},
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
    return Visibility(
      visible: ref.watch(detailLibraryViewModel.select((value) => value.library?.tracks.isNotEmpty ?? false)),
      child: IconButton(
        onPressed: () {
          ref.read(mainAudioController).setPlaylist(
            tracks: ref.watch(detailLibraryViewModel.select((value) => value.library!.tracks))
          );
        },
        icon: Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: PRIMARY_COLOR,
          ),
          child: DynamicImage(
            AppConstantIcons.play,
            width: 20,
            height: 20,
            color: PRIMARY_BACKGROUND,
          ),
        ),
      ),
    );
  }

  Widget _albums() {
    final albums = ref.watch(artistViewModel.select(
      (value) => value.albums
    ));
    return albums.isNotEmpty
      ? ListView.separated(
          padding: EdgeInsets.zero,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: albums.length,    
          itemBuilder: (context, index) => GestureDetector(
            onTap: () {
              context.push('${RouteNamed.library}/${albums[index].id}');
            },
            child: LibraryWidget(albums[index]),
          ),
          separatorBuilder: (context, state) => const SizedBox(height: 16),
        )
      : Container();
  }
}