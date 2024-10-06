import 'dart:convert';

class AddTrackToAlbumReq {
  AddTrackToAlbumReq({
    required this.albumId,
    required this.tracksId,
  });

  String albumId;
  List<String> tracksId;

  Map<String, dynamic> toJson() => {
    'track_list': jsonEncode(tracksId),
  };
}
