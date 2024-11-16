import 'package:flutter/material.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class SuggestedArtistWidget extends StatelessWidget {
  final UserModel artist;
  const SuggestedArtistWidget(this.artist, {super.key});
  final double size = 150;

  @override
  Widget build(BuildContext context) {
    return Container(
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