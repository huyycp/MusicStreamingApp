import 'package:go_router/go_router.dart';
import 'package:mobile/views/create_track/create_track_audio_view.dart';
import 'package:mobile/views/create_track/create_track_genre_view.dart';
import 'package:mobile/views/create_track/create_track_info_view.dart';
import 'package:mobile/views/create_track/create_track_lyrics_view.dart';
import 'package:mobile/views/create_track/create_track_thumbnail_view.dart';
import 'package:mobile/views/not_found/not_found_view.dart';

class TrackRoute {
  TrackRoute._();

  static RouteBase get routes => _trackRoute;

  static final GoRoute _trackRoute = GoRoute(
    path: '/track',
    builder: (context, state) => const NotFoundView(),
    routes: [
      _createTrackRoute,
    ]
  );

  static final GoRoute _createTrackRoute = GoRoute(
    path: 'create',
    name: 'create-track',
    builder: (context, state) => const NotFoundView(),
    routes: [
      GoRoute(
        path: 'track-info',
        builder: (context, state) => const CreateTrackInfoView()
      ),
      GoRoute(
        path: 'audio',
        builder: (context, state) => const CreateTrackAudioView()
      ),
      GoRoute(
        path: 'lyrics',
        builder: (context, state) => const CreateTrackLyricsView( )
      ),
      GoRoute(
        path: 'thumbnail',
        builder: (context, state) => const CreateTrackThumbnailView()
      ),
      GoRoute(
        path: 'genre',
        builder: (context, state) => const CreateTrackGenreView()
      ),
    ]
  );
}