import 'package:go_router/go_router.dart';
import 'package:mobile/views/create_album/create_album_view.dart';
import 'package:mobile/views/create_playlist/create_playlist_view.dart';
import 'package:mobile/views/detail_library/detail_library_view.dart';
import 'package:mobile/views/library/library_view.dart';

class LibraryRoute {
  LibraryRoute._();

  static RouteBase get routes => _libraryRoute;
  static const String _baseLibrary = '/library';
  static const String _createAlbum = 'create-album';
  static const String _createPlaylist = 'create-playlist';

  static String get library => _baseLibrary;
  static String get createAlbum => '$_baseLibrary/$_createAlbum';
  static String get createPlaylist => '$_baseLibrary/$_createPlaylist';

  static final GoRoute _libraryRoute = GoRoute(
    path: _baseLibrary,
    builder: (context, state) => const LibraryView(),
    routes: [
      _createAlbumRoute,
      _createPlaylistRoute,
      _detailLibraryRoute,
    ]
  );

  static final GoRoute _createAlbumRoute = GoRoute(
    path: _createAlbum,
    name: 'create-album',
    builder: (context, state) => const CreateAlbumView(),
    routes: [
      GoRoute(
        path: ':id',
        builder: (context, state) => CreateAlbumView(id: state.pathParameters['id'])
      )
    ]
  );

  static final GoRoute _createPlaylistRoute =  GoRoute(
    path: _createPlaylist,
    name: 'create-playlist',
    builder: (context, state) => const CreatePlaylistView(),
    routes: [
      GoRoute(
        path: ':id',
        builder: (context, state) => CreatePlaylistView(id: state.pathParameters['id'])
      )
    ]
  );

  static final GoRoute _detailLibraryRoute = GoRoute(
    path: ':id',
    name: 'library',
    builder: (context, state) => DetailLibraryView(
      id: state.pathParameters['id']!,
      isGenre: bool.parse(state.uri.queryParameters['isGenre'] ?? 'false'),
    )
  );
}