import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';

class SearchResp {
  SearchResp({
    required this.tracks,
    required this.artists,
    required this.albums,
  });


  final List<TrackModel> tracks;
  final List<UserModel> artists;
  final List<LibraryModel> albums;

  factory SearchResp.fromJson(Map<String, dynamic> json) => SearchResp(
    tracks: List.from(json['tracks']?.map((trackJson) => TrackModel.fromJson(trackJson)) ?? []),
    artists: List.from(json['artists']?.map((artistJson) => UserModel.fromJson(artistJson)) ?? []),
    albums: List.from(json['albums']?.map((albumJson) => LibraryModel.fromJson(albumJson)) ?? []),
  );
}