import 'package:mobile/models/library_model.dart';
import 'package:mobile/utils/list_ex.dart';

class PlaylistWithTrackResp {
  PlaylistWithTrackResp({
    required this.playlistsWithTrack,
    required this.playlistsWithoutTrack,
  });

  List<LibraryModel> playlistsWithTrack;
  List<LibraryModel> playlistsWithoutTrack;

  factory PlaylistWithTrackResp.fromJson(Map<String, dynamic> json) => PlaylistWithTrackResp(
    playlistsWithTrack: listFromJson(json['playlistsWithTrack'], LibraryModel.fromJson),
    playlistsWithoutTrack: listFromJson(json['playlistsWithoutTrack'], LibraryModel.fromJson),
  );
}