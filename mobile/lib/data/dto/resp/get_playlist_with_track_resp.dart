// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:mobile/models/library_model.dart';

class GetPlaylistWithTrackResp {
  GetPlaylistWithTrackResp({
    required this.playlistsWithTracks,
    required this.playlistsWithoutTracks,
  });

  List<LibraryModel> playlistsWithTracks;
  List<LibraryModel> playlistsWithoutTracks;

  factory GetPlaylistWithTrackResp.fromJson(Map<String, dynamic> json) => GetPlaylistWithTrackResp(
    playlistsWithTracks: List.from(json['playlistsWithTrack']?.map(
      (playlistJson) => LibraryModel.fromJson(playlistJson)
    ) ?? []),
    playlistsWithoutTracks: List.from(json['playlistsWithoutTrack']?.map(
      (playlistJson) => LibraryModel.fromJson(playlistJson)
    ) ?? []),
  );
}
