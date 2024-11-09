import 'dart:convert';

class AddTrackToLibraryReq {
  AddTrackToLibraryReq({
    required this.libraryId,
    required this.tracksId,
  });

  String libraryId;
  List<String> tracksId;

  Map<String, dynamic> toJson() => {
    'track_list': jsonEncode(tracksId),
  };
}
