import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/add_track_to_library_req.dart';
import 'package:mobile/data/dto/req/create_library_req.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/resp/get_library_resp.dart';
import 'package:mobile/models/library_model.dart';

final libraryRemoteProvider = Provider<LibraryRemoteDataSource>(
  (ref) => LibraryRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider)
  )
);

class LibraryRemoteDataSource {
  LibraryRemoteDataSource({
    required MagicMusicApi magicMusicApi,
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _libraryPath = '/libraries';

  Future<bool> createAlbum(CreateLibraryRep req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      '$_libraryPath/albums',
      method: HttpMethods.POST,
      data: data
    );
    return response.statusCode == HttpStatus.created;
  }

  Future<bool> createPlaylist(CreateLibraryRep req) async {
    final response = await _magicMusicApi.request(
      '$_libraryPath/playlists',
      method: HttpMethods.POST,
      data: await req.toJson(),
    );
    return response.statusCode == HttpStatus.created;
  }

  Future<GetLibraryResp?> getLibraries(GetLibraryReq req) async {
    final response = await _magicMusicApi.request(
      '$_libraryPath/my-libraries',
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

  Future<LibraryModel?> getLibrary(String libraryId) async {
    final response = await _magicMusicApi.request(
      '$_libraryPath/$libraryId',
      method: HttpMethods.GET,
    );
    
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      if (data != null) {
        return LibraryModel.fromJson(data);
      }
    }
    return null;
  }

  Future<bool> addTracksToLibrary(AddTrackToLibraryReq req) async {
    final response = await _magicMusicApi.request(
      '$_libraryPath/${req.libraryId}/tracks',
      method: HttpMethods.PATCH,
      data: req.toJson(),
    );
    return response.statusCode == HttpStatus.ok;
  }

  Future<GetLibraryResp?> getAlbums(GetLibraryReq req) async {
    final response = await _magicMusicApi.request(
      '$_libraryPath/albums',
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