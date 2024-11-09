import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/main/main_view_model.dart';

class BaseTabView extends ConsumerWidget {
  final List<dynamic> items;
  final Widget Function(dynamic) itemWidget;
  final Future<void> Function()? onRefresh;
  final ScrollController? scrollController;
  const BaseTabView({
    required this.items,
    required this.itemWidget,
    this.onRefresh,
    this.scrollController,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: RefreshIndicator(
        onRefresh: onRefresh ?? () async {},
        child: ListView.separated(
          itemCount: items.length,
          itemBuilder: (context, index) => GestureDetector(
            onTap: () async {
              final trackList = items is List<TrackModel>
                ? List<TrackModel>.from(items)
                : await ref.read(libraryViewModel).getTracksByLibrary(items[index].id);
              int initialIndex = items is List<TrackModel>
                ? index
                : 0;
              ref.read(mainViewModel).setPlaylist(
                tracks: trackList,
                initialIndex: initialIndex
              );
            },
            child: itemWidget(items[index])
          ),
          separatorBuilder: (context, index) => const SizedBox(height: 8),
          controller: scrollController,
          physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
        ),
      ),
    );
  }
}