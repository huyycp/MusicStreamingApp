import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/track_remote_data_source.dart';
import 'package:mobile/data/dto/create_track_dto.dart';

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
  }) async  {
    return await _trackRemote.createTrack(CreateTrackDto(
      title: title,
      description: description,
      audio: audio,
      lyrics: lyrics,
      thumbnail: thumbnail,
    ));
  }
}