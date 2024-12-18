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
  static const String _baseTrack = '/track';
  static const String _createTrack = 'create';
  static const String _createTrackInfo = 'track-info';
  static const String _createTrackAudio = 'audio';
  static const String _createTrackLyrics = 'lyrics';
  static const String _createTrackThumbnail = 'thumbnail';
  static const String _createTrackGenre = 'genre';

  static String get createTrack => '$_baseTrack/$_createTrack';
  static String get createTrackInfo => '$createTrack/$_createTrackInfo';
  static String get createTrackAudio => '$createTrack/$_createTrackAudio';
  static String get createTrackLyrics => '$createTrack/$_createTrackLyrics';
  static String get createTrackThumbnail => '$createTrack/$_createTrackThumbnail';
  static String get createTrackGenre => '$createTrack/$_createTrackGenre';

  static final GoRoute _trackRoute = GoRoute(
    path: _baseTrack,
    builder: (context, state) => const NotFoundView(),
    routes: [
      _createTrackRoute,
    ]
  );

  static final GoRoute _createTrackRoute = GoRoute(
    path: _createTrack,
    name: 'create-track',
    builder: (context, state) => const NotFoundView(),
    routes: [
      GoRoute(
        path: _createTrackInfo,
        builder: (context, state) => const CreateTrackInfoView()
      ),
      GoRoute(
        path: _createTrackAudio,
        builder: (context, state) => const CreateTrackAudioView()
      ),
      GoRoute(
        path: _createTrackLyrics,
        builder: (context, state) => const CreateTrackLyricsView( )
      ),
      GoRoute(
        path: _createTrackThumbnail,
        builder: (context, state) => const CreateTrackThumbnailView()
      ),
      GoRoute(
        path: _createTrackGenre,
        builder: (context, state) => const CreateTrackGenreView()
      ),
    ]
  );
}