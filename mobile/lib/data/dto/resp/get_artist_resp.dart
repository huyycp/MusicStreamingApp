import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/user_model.dart';

class GetArtistResp {
  GetArtistResp({
    required this.meta,
    required this.artists
  });

  MetaResp meta;
  List<UserModel> artists;

  factory GetArtistResp.fromJson(Map<String, dynamic> json) => GetArtistResp(
    meta: MetaResp.fromJson(json['meta'] ?? {}),
    artists: List.from(json['data'].map(
      (userJson) => UserModel.fromJson(userJson)
    ) ?? [])
  );
}