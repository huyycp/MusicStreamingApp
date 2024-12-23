import 'package:go_router/go_router.dart';
import 'package:mobile/views/create_report/create_report_view.dart';
import 'package:mobile/views/report/report_view.dart';

class ReportRoute {
  ReportRoute._();

  static RouteBase get routes => _reportRoute;
  static const String _baseReport = '/report';
  static const String _createReport = 'create-report';

  static String get report => _baseReport;
  static String get createReport => '$_baseReport/$_createReport';

  static final GoRoute _reportRoute = GoRoute(
    path: _baseReport,
    builder: (context, state) => const ReportView(),
    routes: [
      GoRoute(
        path: '$_createReport/:id',
        name: 'create-report',
        builder: (context, state) => CreateReportView(trackId: state.pathParameters['id']!),
      ),
    ]
  );
}