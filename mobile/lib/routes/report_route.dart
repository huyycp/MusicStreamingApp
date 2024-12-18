import 'package:go_router/go_router.dart';
import 'package:mobile/views/not_found/not_found_view.dart';
import 'package:mobile/views/report/report_view.dart';

class ReportRoute {
  ReportRoute._();

  static RouteBase get routes => _reportRoute;
  static const String _baseReport = '/report';

  static String get createReport => _baseReport;

  static final GoRoute _reportRoute = GoRoute(
    path: _baseReport,
    builder: (context, state) => const NotFoundView(),
    routes: [
      GoRoute(
        path: ':id',
        name: 'create-report',
        builder: (context, state) => ReportView(trackId: state.pathParameters['id']!),
      ),
    ]
  );
}