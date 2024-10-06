import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/pick_track/pick_track_view_model.dart';
import 'package:mobile/views/pick_track/widgets/pick_track_widget.dart';
import 'package:mobile/widgets/base_container.dart';

class PickTrackView extends ConsumerStatefulWidget {
  final String albumId;
  const PickTrackView({ required this.albumId, super.key});

  @override
  ConsumerState<PickTrackView> createState() => _PickTrackViewState();
}

class _PickTrackViewState extends ConsumerState<PickTrackView> {
  @override
  void initState() {
    super.initState();
    ref.read(pickTrackViewModel).setAlbumId(widget.albumId);
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
      bottomNavigationBar: _addPickedTracksBtn(),
    );
  }
  
  AppBar _appBar() {
    return AppBar(
      title: const Text('Add tracks to album'),
      leading: const SizedBox.shrink(),
      centerTitle: false,
      leadingWidth: 0,
      actions: _appBarActions(),
    );
  }

  List<Widget> _appBarActions() {
    return [
      _skipBtn(),
    ];
  }

  Widget _skipBtn() {
    return TextButton(
      onPressed: () {
        Navigator.popUntil(context, ModalRoute.withName('main'));
      },
      child: const Text('Skip'),
    );
  }
  
  Widget _body() {
    final pendingTracks = ref.watch(pickTrackViewModel.select(
      (value) => value.pendingTracks
    ));
    return BaseContainer(
      child: ListView.builder(
        itemCount: pendingTracks.length,
        itemBuilder: (context, index) => Container(
          margin: const EdgeInsets.symmetric(vertical: 4),
          child: PickTrackWidget(pendingTracks[index]),
        ),
        physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
      ),
    );
  }

  Widget _addPickedTracksBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: ElevatedButton(
        onPressed: () {
          ref.read(pickTrackViewModel).addPickedTracks();
        },
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          )
        ),
        child: const Text('Add tracks'),
      ),
    );
  }
}