import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/album_remote_data_source.dart';
import 'package:mobile/data/dto/req/create_album_req.dart';

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

  Future<bool> createAlbum({
    required String name,
    required XFile image,
  }) async {
    final req = CreateAlbumReq(
      name: name,
      image: image
    );
    return await _albumRemote.createAlbum(req);
  }
}