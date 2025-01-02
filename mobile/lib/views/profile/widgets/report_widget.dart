import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/report_model.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/string_format.dart';

class ReportWidget extends StatelessWidget {
  const ReportWidget(this.report, {super.key});
  final ReportModel report;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.push('${RouteNamed.report}/${report.id}'),
      child: Row(
        children: [
          Expanded(
            child: Text(
              report.subject,
              style: Theme.of(context).textTheme.bodyLarge,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const SizedBox(width: 12),
          _reportStatusTag(context),
        ],
      ),
    );
  }

  Widget _reportStatusTag(BuildContext context) {
    final Color color;
    switch(report.status) {
      case ReportStatus.resolved:
        color = Colors.green[700]!;
        break;
      case ReportStatus.pending:
        color = Colors.amber[700]!;
        break;
      case ReportStatus.dismissed:
        color = Colors.red[700]!;
        break;
      default: 
        color = Colors.grey[700]!;
    }
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12)
      ),
      child: Text(
        report.status.name.capitalize(),
        style: Theme.of(context).textTheme.titleSmall?.copyWith(
          fontWeight: FontWeight.bold
        ),
      ),
    );
  }
}