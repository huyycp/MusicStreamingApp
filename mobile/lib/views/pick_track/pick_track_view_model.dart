import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/track_repository.dart';

final pickTrackViewModel = ChangeNotifierProvider.autoDispose<PickTrackViewModel>(
  (ref) => PickTrackViewModel(
    trackRepo: ref.read(trackRepoProvider),
  )
);

class PickTrackViewModel extends ChangeNotifier {
  PickTrackViewModel({
    required TrackRepository trackRepo,
  }) : _trackRepo = trackRepo;

  final TrackRepository _trackRepo;
  List<TrackModel> pendingTracks = [];
  List<TrackModel> pickedTracks = [];

  Future<void> getPendingTracks() async {
    final resp = await _trackRepo.getTracksByUser(
      pagination: PaginationListReq(),
      status: TrackStatus.pending,
    );
    if (resp != null) {
      pendingTracks = resp.tracks;
      notifyListeners();
    }
  }

  void togglePickTrack(TrackModel track) {
    if (pickedTracks.contains(track)) {
      pickedTracks.remove(track);
      pickedTracks = [...pickedTracks];
    } else {
      pickedTracks = [...pickedTracks, track];
    }
    print(pickedTracks.map((track) => track.name).toList());
    notifyListeners();
  }

  Future<void> addPickedTracks() async {
    pickedTracks;
  }
}