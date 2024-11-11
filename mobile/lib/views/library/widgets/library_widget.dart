import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/string_format.dart';
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
          Container(
            padding: library.type == LibraryType.album ? EdgeInsets.zero : const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: DIVIDER,
            ),
            child: DynamicImage(
              library.type == LibraryType.album
                ? library.imageLink
                : 'assets/icons/ic_music_note.svg',
              width: library.type == LibraryType.album ? 64 : 32,
              height: library.type == LibraryType.album ? 64 : 32,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  library.name,
                  style: Theme.of(context).textTheme.titleMedium,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                // const SizedBox(height: 8),
                Text(
                  '${library.type.name.capitalize()} - ${library.ownersName.isEmpty ? 'owner' : library.ownersName}',
                  style: Theme.of(context).textTheme.bodyMedium,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                )
              ],
            ),
          ),
          Text(
            '${library.numOfTracks} tracks',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),      
    );
  }
}