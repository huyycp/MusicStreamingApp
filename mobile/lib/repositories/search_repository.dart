import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/search_remote_data_source.dart';
import 'package:mobile/data/dto/resp/search_resp.dart';

final searchRepoProvider = Provider<SearchRepository>(
  (ref) => SearchRepository(
    searchRemote: ref.read(searchRemoteProvider)
  )
);

class SearchRepository {
  SearchRepository({
    required SearchRemoteDataSource searchRemote,
  }) : _searchRemote = searchRemote;

  final SearchRemoteDataSource _searchRemote;

  Future<SearchResp> search(String keyword) async {
    return await _searchRemote.search(keyword);
  }
}