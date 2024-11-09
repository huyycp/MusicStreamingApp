import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/pick_track/pick_track_view_model.dart';
import 'package:mobile/views/pick_track/widgets/pick_track_widget.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class PickTrackView extends ConsumerStatefulWidget {
  final String libraryId;
  const PickTrackView({ required this.libraryId, super.key});

  @override
  ConsumerState<PickTrackView> createState() => _PickTrackViewState();
}

class _PickTrackViewState extends ConsumerState<PickTrackView> {
  @override
  void initState() {
    super.initState();
    ref.read(pickTrackViewModel).setLibraryId(widget.libraryId);
    ref.read(pickTrackViewModel).getPendingTracks();
  }
  
  @override
  Widget build(BuildContext context) {
    ref.listen(pickTrackViewModel.select((value) => value.addTrackSuccess), (prev, next) {
      if (next) {
        Navigator.popUntil(context, ModalRoute.withName('main'));
      }
    });

    return Scaffold(
      appBar: _appBar(),
      body: _body(),
    );
  }
  
  AppBar _appBar() {
    return AppBar(
      title: Text(
        'Add tracks to playlist',
        style: Theme.of(context).textTheme.titleLarge
      ),
      centerTitle: true,
    );
  }

  Widget _body() {
    return BaseContainer(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _searchBar(),
          const SizedBox(height: 16),
          _trackListContainer(),
        ],
      ),
    );
  }

  Widget _searchBar() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: GRAY_BCK_1,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          DynamicImage(
            'assets/icons/ic_search.svg',
            width: 24,
            height: 24,
          ),
          const SizedBox(width: 8),
          Text(
            'Search',
            style: Theme.of(context).textTheme.titleMedium,
          ),
        ],
      ),
    );
  }

  Widget _trackListContainer() {
    return Container(
      height: 0.75 * MediaQuery.sizeOf(context).height,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: GRAY_BCK_1,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _description(),
          const SizedBox(height: 32),
          _trackList(),
        ],
      ),
    );
  }
  
  Widget _description() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Suggested', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 8),
        Text('Based on your listening', style: Theme.of(context).textTheme.bodyMedium),
      ],
    );
  }

  Widget _trackList() {
    final pendingTracks = ref.watch(pickTrackViewModel.select(
      (value) => value.pendingTracks
    ));
    return Expanded(
      child: ListView.separated(
        itemCount: pendingTracks.length,
        itemBuilder: (context, index) => Container(
          margin: const EdgeInsets.symmetric(vertical: 4),
          child: PickTrackWidget(pendingTracks[index]),
        ),
        separatorBuilder: (context, index) => const SizedBox(height: 8),
        physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
      ),
    );
  }
}