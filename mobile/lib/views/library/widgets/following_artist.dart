import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class FollowingArtist extends ConsumerWidget {
  const FollowingArtist(this.artist, {super.key});
  final UserModel artist;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        ref.read(mainViewModel).openArrist(artist.id);
      },
      child: Row(
        children: [
          DynamicImage(
            artist.avatarLink,
            width: 64,
            height: 64,
            isCircle: true,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              artist.name,
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ),
        ],
      ),
    );
  }
}