import 'dart:convert';

class ManageTracksInLibraryReq {
  ManageTracksInLibraryReq({
    required this.libraryId,
    required this.tracksId,
    this.action = ManageTrackActions.add,
  });

  String libraryId;
  List<String> tracksId;
  ManageTrackActions action;

  Map<String, dynamic> toJson() => {
    'track_list': jsonEncode(tracksId),
  };
}

enum ManageTrackActions {
  add,
  del,
}
