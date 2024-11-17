import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/report/report_view_model.dart';
import 'package:mobile/views/report/widgets/app_chip_selector.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/widgets/loading_widget.dart';

class ReportView extends ConsumerStatefulWidget {
  const ReportView({required this.trackId, super.key});
  final String trackId;

  @override
  ConsumerState<ReportView> createState() => _ReportViewState();
}

class _ReportViewState extends ConsumerState<ReportView> {
  @override
  void initState() {
    super.initState();
    ref.read(reportViewModel).getTrack(widget.trackId);
  }

  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
        bottomNavigationBar: _sendReportBtn(),
        extendBody: true,
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Report'),
    );
  }
  
  Widget _body() {
    final isLoading = ref.watch(reportViewModel.select(
      (value) => value.isLoading
    ));
    return isLoading
      ? const Center(child: CircularProgressIndicator())
      : SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _trackInfo(),
              const SizedBox(height: 24),
              _reasonSelector(),
              const SizedBox(height: 24),
              _subjectInput(),
              const SizedBox(height: 24),
              _bodyInput(),
            ],
          ),
        );
  }

  Widget _trackInfo() {
    final track = ref.watch(reportViewModel.select(
      (value) => value.track
    ));
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: GRAY_BCK_1,
      ),
      child: Row(
        children: [
          DynamicImage(
            track!.imageLink,
            width: 72,
            height: 72,
            borderRadius: BorderRadius.circular(8),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  track.name,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Text(
                  track.ownerNames,
                  style: Theme.of(context).textTheme.bodyMedium
                ),
              ], 
            ),
          )
        ],
      ),
    );
  }

  Widget _reasonSelector() {
    return const AppChipSelector();
  }

  Widget _subjectInput() {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FieldLabel('Subject'),
          const SizedBox(height: 8),
          TextField(
            controller: ref.read(reportViewModel).subjectController,
          ),
        ],
      ),
    );
  }

  Widget _bodyInput() {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FieldLabel('Body'),
          const SizedBox(height: 8),
          TextField(
            controller: ref.read(reportViewModel).bodyController,
          ),
        ],
      ),
    );
  }

  Widget _sendReportBtn() {
    final isValidForm = ref.watch(reportViewModel.select(
      (value) => value.isValidForm
    ));
    return BaseButton(
      onPressed: isValidForm
        ? () {
          ref.read(reportViewModel).createReport();
        }
        : null,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          LoadingWidget(visible: ref.watch(reportViewModel.select((value) => value.isReportCreated == null))),
          const Text('Send'),
        ],
      ),
    );
  }
}