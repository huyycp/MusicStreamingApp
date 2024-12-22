import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/profile/widgets/report_widget.dart';
import 'package:mobile/views/report/report_view_model.dart';
import 'package:mobile/widgets/base_container.dart';

class ReportView extends ConsumerStatefulWidget {
  const ReportView({super.key});

  @override
  ConsumerState<ReportView> createState() => _ReportViewState();
}

class _ReportViewState extends ConsumerState<ReportView> {
  @override
  void initState() {
    super.initState();
    ref.read(reportViewModel).getReports();
  }

  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Reports'),
      centerTitle: false,
    );
  }

  Widget _body() {
    final reports = ref.watch(reportViewModel.select(
      (value) => value.reports
    ));
    return ListView.separated(
      itemCount: reports.length,
      itemBuilder: (context, index) => ReportWidget(reports[index]),
      separatorBuilder: (context, index) => const SizedBox(height: 12),
    );
  }
}