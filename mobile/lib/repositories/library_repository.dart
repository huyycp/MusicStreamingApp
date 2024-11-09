import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/library_remote_data_source.dart';
import 'package:mobile/data/dto/req/add_track_to_library_req.dart';
import 'package:mobile/data/dto/req/create_library_req.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_library_resp.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/models/track_model.dart';

final libraryRepoProvider = Provider<LibraryRepository>(
  (ref) => LibraryRepository(
    libraryRemote: ref.read(libraryRemoteProvider),
  )
);

class LibraryRepository {
  LibraryRepository({
    required LibraryRemoteDataSource libraryRemote,
  }) : _libraryRemote = libraryRemote;

  final LibraryRemoteDataSource _libraryRemote;

  Future<bool> createLibrary({
    required String name,
    XFile? image,
    required LibraryType type,
  }) async {
    final req = CreateLibraryRep(
      name: name,
      image: image,
    );
    return type == LibraryType.album
      ? await _libraryRemote.createAlbum(req)
      : await _libraryRemote.createPlaylist(req);
  }

  Future<GetLibraryResp?> getLibraries({
    required PaginationListReq pagination,
    required LibraryType type,
  }) async {
    final req = GetLibraryReq(
      pagination: pagination,
      type: type,
    );
    return await _libraryRemote.getLibraries(req);
  }

  Future<LibraryModel?> getLibrary(String libraryId) async {
    return await _libraryRemote.getLibrary(libraryId);
  }

  Future<bool> addTracksToLibrary({
    required String libraryId,
    required List<TrackModel> tracks,
  }) async {
    final req = AddTrackToLibraryReq(
      libraryId: libraryId,
      tracksId: tracks.map((track) => track.id).toList()
    );
    return await _libraryRemote.addTracksToLibrary(req);
  }

  Future<GetLibraryResp?> getAlbums({
    required PaginationListReq pagination,
  }) async {
    final req = GetLibraryReq(
      pagination: pagination,
      type: LibraryType.album,
    );
    return await _libraryRemote.getAlbums(req);
  }
}