import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/library/base_tab_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/widgets/track_widget.dart';

class TrackListView extends ConsumerStatefulWidget {
  const TrackListView({super.key});

  @override
  ConsumerState<TrackListView> createState() => _TrackListViewState();
}

class _TrackListViewState extends ConsumerState<TrackListView> {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).getMyTracks(refresh: true);
  }

  Widget itemWidget(dynamic track) => TrackWidget(track);
  
  @override
  Widget build(BuildContext context) {
    final tracks = ref.watch(libraryViewModel.select(
      (value) => value.tracks
    ));
    return BaseTabView(
      items: tracks,
      itemWidget: itemWidget,
      onRefresh: () => ref.read(libraryViewModel).getMyTracks(refresh: true),
      scrollController: ref.read(libraryViewModel).trackScrollController,
    );
  }
}