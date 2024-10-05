import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/add_track_to_album_req.dart';
import 'package:mobile/data/dto/req/create_album_req.dart';
import 'package:mobile/data/dto/req/get_album_req.dart';
import 'package:mobile/data/dto/resp/get_album_resp.dart';
import 'package:mobile/data/dto/resp/get_detail_album_resp.dart';
import 'package:mobile/models/album_model.dart';

final albumRemoteProvider = Provider<AlbumRemoteDataSource>(
  (ref) => AlbumRemoteDataSource(
    magicMugicApi: ref.read(magicMusicApiProvider),
  )
);

class AlbumRemoteDataSource {
  AlbumRemoteDataSource({
    required MagicMusicApi magicMugicApi
  }) : _magicMusicApi = magicMugicApi;

  final MagicMusicApi _magicMusicApi;
  final String _albumPath = '/albums';

  Future<AlbumModel?> createAlbum(CreateAlbumReq req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      _albumPath,
      method: HttpMethods.POST,
      data: data
    );
    if (response.statusCode == HttpStatus.created) {
      final data = response.data['result'];
      if (data != null) {
        return AlbumModel.fromJson(data);
      }
    }
    return null;
  }

  Future<GetAlbumResp?> getAlbums(GetAlbumReq req) async {
    final response = await _magicMusicApi.request(
      '$_albumPath/my-albums',
      method: HttpMethods.GET,
      queryParameters: req.toJson(),
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return GetAlbumResp.fromJson(data);
      }
    }
    return null;
  }

  Future<GetDetailAlbumResp?> getAlbum(String albumId) async {
    final response = await _magicMusicApi.request(
      '$_albumPath/$albumId',
      method: HttpMethods.GET,
    );
    
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return GetDetailAlbumResp.fromJson(data);
      }
    }
    return null;
  }

  Future<bool> addTracksToAlbum(AddTrackToAlbumReq req) async {
    final response = await _magicMusicApi.request(
      '$_albumPath/${req.albumId}/tracks',
      method: HttpMethods.PATCH,
      data: req.toJson(),
    );
    return response.statusCode == HttpStatus.ok;
  }
}