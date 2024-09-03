import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/base_api.dart';

final magicMusicApiProvider = Provider<MagicMusicApi>(
  (ref) => MagicMusicApi(dotenv.env['MAGIC_MUSIC_BASE_URL']!)
);

class MagicMusicApi extends BaseApi {
  MagicMusicApi(String baseUrl) {
    dio.options.baseUrl = baseUrl;
  }
}