import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/album_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AlbumWidget extends ConsumerWidget {
  final AlbumModel album;
  const AlbumWidget(this.album, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return GestureDetector(
      onTap: () {
        
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: GRAY_BCK_1,
        ),
        child: Row(
          children: [
            DynamicImage(
              album.image,
              width: 76,
              height: 76,
              borderRadius: BorderRadius.circular(20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                album.name,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            )
          ],
        ),
      ),
    );
  }
}