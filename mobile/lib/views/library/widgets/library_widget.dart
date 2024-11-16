import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/string_format.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class LibraryWidget extends ConsumerWidget {
  final LibraryModel library;
  const LibraryWidget(this.library, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        context.push('/library/${library.id}');
      },
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _libraryImage(),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _libraryName(context),
                _libraryOwner(context, ref),
              ],
            ),
          ),
          _numOfTracks(context),
        ],
      ),      
    );
  }

  Widget _libraryImage() {
    return Container(
      padding: library.type == LibraryType.album || library.isFavorite 
        ? EdgeInsets.zero
        : const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: DIVIDER,
      ),
      child: DynamicImage(
        library.type == LibraryType.album
          ? library.imageLink
          : library.isFavorite
            ? 'assets/images/favorite.jpeg'
            : 'assets/icons/ic_music_note.svg',
        width: library.type == LibraryType.album || library.isFavorite ? 64 : 32,
        height: library.type == LibraryType.album || library.isFavorite ? 64 : 32,
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }

  Widget _libraryName(BuildContext context) {
    return Text(
      library.name,
      style: Theme.of(context).textTheme.titleMedium,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _libraryOwner(BuildContext context, WidgetRef ref) {
    return Text(
      '${library.type.name.capitalize()} - ${library.ownersName.isEmpty ? ref.read(libraryViewModel).user!.name : library.ownersName}',
      style: Theme.of(context).textTheme.bodyMedium,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _numOfTracks(BuildContext context) {
    return Text(
      '${library.numOfTracks} tracks',
      style: Theme.of(context).textTheme.bodyMedium,
    );
  }
}