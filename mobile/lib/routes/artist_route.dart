import 'package:go_router/go_router.dart';
import 'package:mobile/views/artist/artist_view.dart';

class ArtistRoute {
  ArtistRoute._();

  static RouteBase get routes => _artistRoute;
  static const String _baseArtist = '/artist';

  static String get artist => _baseArtist;

  static final GoRoute _artistRoute = GoRoute(
    path: '$_baseArtist/:id',
    builder: (context, state) => ArtistView(id: state.pathParameters['id']!)
  );
}