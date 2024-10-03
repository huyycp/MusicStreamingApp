import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/create_album_req.dart';

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

  Future<bool> createAlbum(CreateAlbumReq req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      _albumPath,
      method: HttpMethods.POST,
      data: data
    );
    return response.statusCode == HttpStatus.created;
  }
}