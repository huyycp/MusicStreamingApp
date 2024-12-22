import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/report_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/string_format.dart';
import 'package:mobile/utils/ui/modal_bottom_sheet.dart';
import 'package:mobile/views/library/widgets/library_widget.dart';
import 'package:mobile/views/profile/widgets/report_widget.dart';
import 'package:mobile/views/report/report_view_model.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

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
    return Column(
      children: [
        _filters(),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.separated(
            itemCount: reports.length,
            itemBuilder: (context, index) => ReportWidget(reports[index]),
            separatorBuilder: (context, index) => const SizedBox(height: 12),
          ),
        ),
      ],
    );
  }

  Widget _filters() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        IconButton(
          onPressed: () {
            showAppModalBottomSheet(context: context, builder: (context) => _reportStatusSheet());
          },
          icon: DynamicImage(
            AppConstantIcons.filter,
            width: 24,
            height: 24,
          ),
        )
      ],
    );
  }

  Widget _reportStatusSheet() {
    final statuses = ReportStatus.values.where((value) => value != ReportStatus.unknown);
    final currentStatus = ref.watch(reportViewModel.select(
      (value) => value.status
    ));
    return Container(
      padding: const EdgeInsets.only(right: 16, bottom: 24, left: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: List.from(statuses.map(
              (status) => GestureDetector(
                onTap: () {
                  context.pop();
                  ref.read(reportViewModel).selectReportStatus(status);
                },
                child: _statusWidget(status, isSelected: currentStatus == status),
              ),
            )),
          ),
        ],
      ),
    );
  }

  Widget _statusWidget(ReportStatus status, { bool isSelected = false }) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: Colors.transparent,
        border: Border.all(
          color: isSelected ? PRIMARY_COLOR : BUTTON_STROKE,
        ),
      ),
      child: Text(
        status.name.capitalize(),
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          color: isSelected ? PRIMARY_COLOR : BUTTON_STROKE,
        )
      ),
    );
  }
}