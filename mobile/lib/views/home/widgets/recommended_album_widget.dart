import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class RecommendedAlbumWidget extends ConsumerWidget {
  final LibraryModel library;
  const RecommendedAlbumWidget(this.library, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () => ref.read(mainViewModel).openLibrary(id: library.id),
      child: SizedBox(
        width: size,
        height: size + 20,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _albumImage(),
            const SizedBox(height: 8),
            _albumName(context),
            _albumOwners(context),
          ],
        ),
      ),
    );
  }

  Widget _albumImage() {
    return DynamicImage(
      library.imageLink,
      width: size,
      height: size,
    );
  }

  Widget _albumName(BuildContext context) {
    return Text(
      library.name,
      style: Theme.of(context).textTheme.titleSmall,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _albumOwners(BuildContext context) {
    return Text(
      library.ownersName,
      style: Theme.of(context).textTheme.bodyMedium,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  } 
}