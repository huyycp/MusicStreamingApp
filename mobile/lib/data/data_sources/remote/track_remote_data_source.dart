import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/magic_music_api.dart';
import 'package:mobile/data/dto/req/create_track_req.dart';
import 'package:mobile/data/dto/req/get_track_req.dart';
import 'package:mobile/data/dto/resp/get_track_resp.dart';
import 'package:mobile/models/track_model.dart';

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
  final String _trackPath = '/tracks';

  Future<bool> createTrack(CreateTrackReq req) async {
    final data = FormData.fromMap(await req.toJson());
    final response = await _magicMusicApi.request(
      _trackPath,
      method: HttpMethods.POST,
      data: data,
      options: Options(
        contentType: 'multipart/form-data',
      )
    );
    return response.statusCode == HttpStatus.created;
  }

  Future<GetTrackResp?> getTracks(GetTrackReq req) async {
    final response = await _magicMusicApi.request(
      _trackPath,
      method: HttpMethods.GET,
      queryParameters: req.toJson()
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null 
        ? GetTrackResp.fromJson(data)
        : null;
    } else {
      return null;
    }
  }

  Future<TrackModel?> getTrack(String trackId) async {
    final response = await _magicMusicApi.request(
      '$_trackPath/$trackId',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? TrackModel.fromJson(data)
        : null; 
    } else {
      return null;
    }
  }

  Future<GetTrackResp?> getTracksByUser({
    required GetTrackReq req,
    TrackStatus status = TrackStatus.all,
  }) async {
    final queryParams = req.toJson();
    queryParams['status'] = (status == TrackStatus.all ? '' : status.name);
    final response = await _magicMusicApi.request(
      '$_trackPath/my-tracks',
      method: HttpMethods.GET,
      queryParameters: queryParams,
    );
    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? GetTrackResp.fromJson(data)
        : null;
    } else {
      return null;
    }
  }
}