import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/album_remote_data_source.dart';
import 'package:mobile/data/dto/req/add_track_to_album_req.dart';
import 'package:mobile/data/dto/req/create_album_req.dart';
import 'package:mobile/data/dto/req/get_album_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_album_resp.dart';
import 'package:mobile/data/dto/resp/get_detail_album_resp.dart';
import 'package:mobile/models/album_model.dart';

final albumRepoProvider = Provider<AlbumRepository>(
  (ref) => AlbumRepository(
    albumRemote: ref.read(albumRemoteProvider),
  )
);

class AlbumRepository {
  AlbumRepository({
    required AlbumRemoteDataSource albumRemote
  }) : _albumRemote = albumRemote;

  final AlbumRemoteDataSource _albumRemote;

  Future<AlbumModel?> createAlbum({
    required String name,
    required XFile image,
  }) async {
    final req = CreateAlbumReq(
      name: name,
      image: image
    );
    return await _albumRemote.createAlbum(req);
  }

  Future<GetAlbumResp?> getAlbums({
    required PaginationListReq pagination
  }) async {
    final req = GetAlbumReq(
      pagination: pagination,
    );
    return await _albumRemote.getAlbums(req);
  }

  Future<GetDetailAlbumResp?> getAlbum(String albumId) async {
    return await _albumRemote.getAlbum(albumId);
  }

  Future<bool> addTracksToAlbum({
    required String albumId,
    required List<String> tracksId,
  }) async {
    final req = AddTrackToAlbumReq(
      albumId: albumId,
      tracksId: tracksId
    );
    return await _albumRemote.addTracksToAlbum(req);
  }
}