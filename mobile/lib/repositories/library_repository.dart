import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/data/data_sources/remote/library_remote_data_source.dart';
import 'package:mobile/data/dto/req/manage_tracks_in_library_req.dart';
import 'package:mobile/data/dto/req/create_library_req.dart';
import 'package:mobile/data/dto/req/get_library_req.dart';
import 'package:mobile/data/dto/req/get_track_req.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/data/dto/resp/get_library_resp.dart';
import 'package:mobile/data/dto/resp/get_track_resp.dart';
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

  Future<LibraryModel?> createLibrary({
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
    LibraryType? type,
    String sortBy = 'created_at',
    SortDirection direction = SortDirection.desc,
  }) async {
    final req = GetLibraryReq(
      pagination: pagination,
      type: type,
      sortBy: sortBy,
      direction: direction,
    );
    return await _libraryRemote.getLibraries(req);
  }

  Future<LibraryModel?> getLibrary(String libraryId) async {
    return await _libraryRemote.getLibrary(libraryId);
  }

  Future<bool> manageTracksInLibrary({
    required String libraryId,
    required List<TrackModel> tracks,
    ManageTrackActions action = ManageTrackActions.add,
  }) async {
    final req = ManageTracksInLibraryReq(
      libraryId: libraryId,
      tracksId: tracks.map((track) => track.id).toList(),
      action: action,
    );
    return await _libraryRemote.manageTracksInLibrary(req);
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

  Future<GetTrackResp?> getTracksNotInLibrary({
    required PaginationListReq pagination,
    String genreId = '',
    required String libraryId,
  }) async {
    final req = GetTrackReq(
      pagination: pagination,
      genreId: genreId,
    );
    return await _libraryRemote.getTracksNotInLibrary(libraryId, req);
  }

  Future<bool> addTracksToFavorite(List<String> trackIds) async {
    return await _libraryRemote.addTracksToFavorite(trackIds);
  }

  Future<LibraryModel?> editLibrary({
    required String id,
    String? name,
    XFile? image,
  }) async {
    final req = CreateLibraryRep(
      name: name ?? '',
      image: image,
    );
    return await _libraryRemote.editLibrary(id, req);
  }
}