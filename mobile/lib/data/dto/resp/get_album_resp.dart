import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/album_model.dart';

class GetAlbumResp {
  GetAlbumResp({
    required this.meta,
    required this.albums,
  });

  MetaResp meta;
  List<AlbumModel> albums;

  factory GetAlbumResp.fromJson(Map<String, dynamic> json) => GetAlbumResp(
    meta: MetaResp.fromJson(json['meta']),
    albums: List.from(json['data']?.map(
      (albumJson) => AlbumModel.fromJson(albumJson),
    ) ?? []),
  );
}
