import 'package:go_router/go_router.dart';
import 'package:mobile/views/create_album/create_album_view.dart';
import 'package:mobile/views/create_playlist/create_playlist_view.dart';
import 'package:mobile/views/detail_library/detail_library_view.dart';
import 'package:mobile/views/library/library_view.dart';

class LibraryRoute {
  LibraryRoute._();

  static RouteBase get routes => _libraryRoute;

  static final GoRoute _libraryRoute = GoRoute(
    path: '/library',
    builder: (context, state) => const LibraryView(),
    routes: [
      _createAlbumRoute,
      _createPlaylistRoute,
    ]
  );

  static final GoRoute librariesRoute = GoRoute(
    path: '/library',
    builder: (context, state) => const LibraryView(),
  );

  static final GoRoute _createAlbumRoute = GoRoute(
    path: 'create-album',
    name: 'create-album',
    builder: (context, state) => const CreateAlbumView(),
  );

  static final GoRoute _createPlaylistRoute =  GoRoute(
    path: 'create-playlist',
    name: 'create-playlist',
    builder: (context, state) => const CreatePlaylistView(),
  );

  static final GoRoute detailLibraryRoute = GoRoute(
    path: '/library/:id',
    name: 'library',
    builder: (context, state) => DetailLibraryView(
      id: state.pathParameters['id']!,
      isGenre: bool.parse(state.uri.queryParameters['isGenre'] ?? 'false'),
    )
  );
}