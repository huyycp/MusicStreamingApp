import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/remote/statistic_remote_data_source.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/user_model.dart';

final statisticRepositoryProvider = Provider<StatisticRepository>(
  (ref) => StatisticRepository(ref)
);

class StatisticRepository {
  StatisticRepository(ProviderRef ref) {
    _statisticRemote = ref.read(statisticRemoteDataSourceProvider);
  }

  late final StatisticRemoteDataSource _statisticRemote;

  Future<List<LibraryModel>> getTopAlbumsByWeek() async {
    return await _statisticRemote.getTopAlbumsByWeek();
  }

  Future<List<LibraryModel>> getTopAlbumsAllTime() async {
    return await _statisticRemote.getTopAlbumsAllTime();
  }

  Future<List<UserModel>> getTopArtistsByWeek() async {
    return await _statisticRemote.getTopArtistsByWeek();
  }

  Future<List<UserModel>> getTopArtistsAllTime() async {
    return await _statisticRemote.getTopArtistsAllTime();
  }

  Future<List<UserModel>> getTopArtistsByFollowers() async {
    return await _statisticRemote.getTopArtistsByFollowers();
  }
}