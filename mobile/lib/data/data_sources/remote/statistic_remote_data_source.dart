import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/models/user_model.dart';

final statisticRemoteDataSourceProvider = Provider<StatisticRemoteDataSource>(
  (ref) => StatisticRemoteDataSource(ref)
);

class StatisticRemoteDataSource {
  StatisticRemoteDataSource(ProviderRef ref) {
    _magicMusicApi = ref.read(magicMusicApiProvider);
  }

  late final MagicMusicApi _magicMusicApi;
  final String _homePath = '/homes';

  Future<List<LibraryModel>> getTopAlbumsByWeek() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-albums-by-week',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<LibraryModel>((e) => LibraryModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }

  Future<List<LibraryModel>> getTopAlbumsAllTime() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-albums-all-time',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<LibraryModel>((e) => LibraryModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }

  Future<List<TrackModel>> getTopTracksByWeek() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-tracks-by-week',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<TrackModel>((e) => TrackModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }

  Future<List<UserModel>> getTopArtistsByWeek() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-artists-by-week',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<UserModel>((e) => UserModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }

  Future<List<UserModel>> getTopArtistsAllTime() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-artists-all-time',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<UserModel>((e) => UserModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }

  Future<List<UserModel>> getTopArtistsByFollowers() async {
    final response = await _magicMusicApi.request(
      '$_homePath/top-artists-by-followers',
      method: HttpMethods.GET,
    );

    if (response.statusCode == HttpStatus.ok) {
      final data = response.data['result'];
      return data != null
        ? data.map<UserModel>((e) => UserModel.fromJson(e)).toList()
        : [];
    } else {
      return [];
    }
  }
}