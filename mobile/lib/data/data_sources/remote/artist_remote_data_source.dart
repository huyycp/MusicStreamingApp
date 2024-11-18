import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/get_artist_req.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/resp/get_artist_resp.dart';
import 'package:mobile/data/dto/resp/get_library_resp.dart';

final artistRemoteProvider = Provider<ArtistRemoteDataSource>(
  (ref) => ArtistRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider),
  )
);

class ArtistRemoteDataSource {
  ArtistRemoteDataSource({
    required MagicMusicApi magicMusicApi,
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _artistPath = '/artists';

  Future<GetArtistResp?> getArtist(GetArtistReq req) async {
    final response = await _magicMusicApi.request(
      _artistPath,
      method: HttpMethods.GET,
      queryParameters: req.toJson(),
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return GetArtistResp.fromJson(data);
      }
    }
    return null;
  }

  Future<GetLibraryResp?> getAlbumsByArtist(GetLibraryReq req, String artistId) async {
    final response = await _magicMusicApi.request(
      '$_artistPath/$artistId/albums',
      method: HttpMethods.GET,
      queryParameters: req.toJson(),
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return GetLibraryResp.fromJson(data);
      }
    }
    return null;
  }
}