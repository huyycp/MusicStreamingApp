import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/track_remote_data_source.dart';
import 'package:mobile/data/dto/req/create_track_req.dart';
import 'package:mobile/data/dto/req/get_track_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_playlist_with_track_resp.dart';
import 'package:mobile/data/dto/resp/get_track_resp.dart';
import 'package:mobile/models/track_model.dart';

final trackRepoProvider = Provider<TrackRepository>(
  (ref) => TrackRepository(
    trackRemote: ref.read(trackRemoteProvider)
  ),
);

class TrackRepository {
  TrackRepository({
    required TrackRemoteDataSource trackRemote
  }) : _trackRemote = trackRemote;

  final TrackRemoteDataSource _trackRemote;

  Future<bool> createTrack({
    required String title,
    String description = '',
    required File audio,
    String lyrics = '',
    required XFile thumbnail,
    required String genreId,
  }) async  {
    return await _trackRemote.createTrack(CreateTrackReq(
      title: title,
      description: description,
      audio: audio,
      lyrics: lyrics,
      thumbnail: thumbnail,
      genreId: genreId,
    ));
  }

  Future<GetTrackResp?> getTracks({
    required PaginationListReq pagination,
    String genreId = '',
  }) async {
    final req = GetTrackReq(
      pagination: pagination,
      genreId: genreId,
    );
    return await _trackRemote.getTracks(req);
  }

  Future<TrackModel?> getTrack({
    required String id,
  }) async {
    return await _trackRemote.getTrack(id);
  }

  Future<GetTrackResp?> getTracksByUser({
    required PaginationListReq pagination,
    String genreId = '',
    TrackStatus status = TrackStatus.all,
  }) async {
    final req = GetTrackReq(
      pagination: pagination,
      genreId: genreId,
    );
    return await _trackRemote.getTracksByUser(
      req: req,
      status: status,
    );
  }

  Future<GetPlaylistWithTrackResp?> getPlaylistWithTrack(String trackId) async {
    return await _trackRemote.getPlaylistWithTrack(trackId);
  }

  Future<List<TrackModel>> getTrackByAudio(String path) async {
    return await _trackRemote.getTrackByAudio(path);
  }
}