import 'package:flutter/material.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/data/constants/app_constant_images.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class PlaylistChoiceWidget extends StatelessWidget {
  const PlaylistChoiceWidget(
    this.library, {
    required this.onTap,
    required this.isSelected,
    super.key,
  });

  final LibraryModel library;
  final void Function() onTap;
  final bool isSelected;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          _image(),
          const SizedBox(width: 12),
          _playlistInfo(context),
          const SizedBox(width: 12),
          _selector(),
        ],
      ),
    );
  }

  Widget _image() {
    return SizedBox(
      width: 48,
      height: 48,
      child: library.isFavorite
        ? DynamicImage(
            AppConstantImages.favoritePlaylist,
            width: 48,
            height: 48,
          )
        : Center(
            child: DynamicImage(
              AppConstantIcons.musicNote,
              width: 32,
              height: 32,
            ),
          ),
    );
  }

  Widget _playlistInfo(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            library.name,
            style: Theme.of(context).textTheme.titleMedium,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            '${library.numOfTracks} tracks',
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.bodyMedium,
          )
        ],
      ),
    );
  }

  Widget _selector() {
    return isSelected
      ? DynamicImage(
          AppConstantIcons.addedCheck,
          width: 24,
          height: 24,
        )
      : Container(
          width: 24,
          height: 24,
          decoration: BoxDecoration(
            border: Border.all(color: BUTTON_STROKE),
            shape: BoxShape.circle
          ),  
        );
  }
}