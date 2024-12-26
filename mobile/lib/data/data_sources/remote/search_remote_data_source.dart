import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/api/magic_music_api.dart';
import 'package:mobile/data/dto/resp/search_resp.dart';

final searchRemoteProvider = Provider<SearchRemoteDataSource>(
  (ref) => SearchRemoteDataSource(
    magicMusicApi: ref.read(magicMusicApiProvider)
  )
);

class SearchRemoteDataSource {
  SearchRemoteDataSource({
    required MagicMusicApi magicMusicApi,
  }) : _magicMusicApi = magicMusicApi;

  final MagicMusicApi _magicMusicApi;
  final String _searchPath = '/search';


  Future<SearchResp> search(String keyword) async {
    final response = await _magicMusicApi.request(
      _searchPath,
      method: HttpMethods.GET,
      queryParameters: {
        'keyword': keyword,
      }
    );
    if (response.statusCode == HttpStatus.created) {
      final data = response.data['result'];
      if (data != null) {
        return SearchResp.fromJson(data);
      }
    }
    return SearchResp.fromJson({});
  } 
}