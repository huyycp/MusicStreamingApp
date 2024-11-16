import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class RecommendedAlbumWidget extends StatelessWidget {
  final LibraryModel library;
  const RecommendedAlbumWidget(this.library, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.push('/library/${library.id}'),
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