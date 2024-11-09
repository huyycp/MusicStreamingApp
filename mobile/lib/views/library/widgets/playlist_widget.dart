import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class PlaylistWidget extends ConsumerWidget {
  final LibraryModel playlist;
  const PlaylistWidget(this.playlist, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        context.push('/playlist/${playlist.id}');
      },
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(12),
          decoration: const BoxDecoration(
            color: DIVIDER,
          ),
          constraints: const BoxConstraints(
            maxHeight: 56,
            maxWidth: 56,
          ),
          child: DynamicImage(
            'assets/icons/ic_music_note.svg',
            width: 40,
            height: 40,
            borderRadius: BorderRadius.circular(20),
            color: BUTTON_STROKE,
          ),
        ),
        title: Text(
          playlist.name,
          style: Theme.of(context).textTheme.titleMedium,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: Text(
          '${playlist.numOfTracks} tracks',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        contentPadding: EdgeInsets.zero,
        horizontalTitleGap: 12,
      ),
    );
  }
}