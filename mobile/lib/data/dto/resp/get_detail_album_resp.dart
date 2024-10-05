import 'package:mobile/models/album_model.dart';
import 'package:mobile/models/track_model.dart';

class GetDetailAlbumResp {
  GetDetailAlbumResp({
    required this.album,
    required this.tracks,
  });
  
  AlbumModel album;
  List<TrackModel> tracks;

  factory GetDetailAlbumResp.fromJson(Map<String, dynamic> json) => GetDetailAlbumResp(
    album: AlbumModel.fromJson(json['album_info'] ?? {}),
    tracks: List.from(json['list_of_tracks'].map(
      (trackJson) => TrackModel.fromJson(trackJson),
    ) ?? [])
  );
}
