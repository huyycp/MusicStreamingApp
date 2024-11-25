import 'package:go_router/go_router.dart';
import 'package:mobile/views/pick_track/pick_track_view.dart';

class PickTrackRoute {
  PickTrackRoute._();

  static RouteBase get routes => _pickTrackRoute;

  static final GoRoute _pickTrackRoute = GoRoute(
    path: '/pick-track/:libraryId',
    name: 'pick-track',
    builder: (context, state) => PickTrackView(libraryId: state.pathParameters['libraryId'] ?? '')
  );
}