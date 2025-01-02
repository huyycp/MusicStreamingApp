import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class SuggestedArtistWidget extends ConsumerWidget {
  final UserModel artist;
  const SuggestedArtistWidget(this.artist, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        ref.read(mainViewModel).openArrist(artist.id);
      },
      child: Column(
        children: [
          _artistImage(),
          const SizedBox(height: 8),
          _artistName(context),
        ],
      ),
    );
  }

  Widget _artistImage() {
    return DynamicImage(
      artist.avatarLink,
      width: size,
      height: size,
      isCircle: true,
    );
  }

  Widget _artistName(BuildContext context) {
    return Text(
      artist.name,
      style: Theme.of(context).textTheme.titleMedium,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }
}