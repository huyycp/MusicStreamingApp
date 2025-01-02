import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/track_model.dart';

class GetTrackResp {
  GetTrackResp({
    required this.meta,
    required this.tracks
  });

  MetaResp meta;
  List<TrackModel> tracks;

  factory GetTrackResp.fromJson(Map<String, dynamic> json) => GetTrackResp(
    meta: MetaResp.fromJson(json['meta'] ?? {}),
    tracks: List.from(json['data'].map(
      (trackJson) => TrackModel.fromJson(trackJson)
    ) ?? [])
  );
}