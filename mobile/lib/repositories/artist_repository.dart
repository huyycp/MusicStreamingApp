import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/artist_remote_data_source.dart';
import 'package:mobile/data/dto/req/get_artist_req.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_artist_resp.dart';
import 'package:mobile/data/dto/resp/get_library_resp.dart';
import 'package:mobile/models/library_model.dart';

final artistRepoProvider = Provider<ArtistRepository>(
  (ref) => ArtistRepository(
    artistRemote: ref.read(artistRemoteProvider)
  )
);

class ArtistRepository {
  ArtistRepository({
    required ArtistRemoteDataSource artistRemote,
  }) : _artistRemote = artistRemote;

  final ArtistRemoteDataSource _artistRemote;

  Future<GetArtistResp?> getArtists({
    required PaginationListReq pagination,
  }) async {
    final req = GetArtistReq(pagination: pagination);
    return await _artistRemote.getArtist(req);
  }

  Future<GetLibraryResp?> getAlbumsByArtist({
    required PaginationListReq pagination,
    required String artistId,
  }) async {
    final req = GetLibraryReq(
      pagination: pagination,
      type: LibraryType.album,
    );
    return await _artistRemote.getAlbumsByArtist(req, artistId);
  }
}