import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/create_track_dto.dart';

final trackRemoteProvider = Provider<TrackRemoteDataSource>(
  (ref) => TrackRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider),
  )
);

class TrackRemoteDataSource {
  TrackRemoteDataSource({
    required MagicMusicApi magicMusicApi
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _createTrackPath = '/tracks/create-track';

  Future<bool> createTrack(CreateTrackDto dto) async {
    final data = FormData.fromMap(await dto.toJson());
    final response = await _magicMusicApi.request(
      _createTrackPath,
      method: HttpMethod.POST,
      data: data,
      options: Options(
        contentType: 'multipart/form-data',
      )
    );
    return response.statusCode == HttpStatus.created;
  }
}