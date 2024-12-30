import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_report/widgets/app_chip_selector.dart';
import 'package:mobile/views/detail_report/detail_report_view_model.dart';
import 'package:mobile/widgets/app_appbar.dart';
import 'package:mobile/widgets/audio_image_widget.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/field_label.dart';

class DetailReportView extends ConsumerStatefulWidget {
  const DetailReportView({required this.reportId, super.key});
  final String reportId;

  @override
  ConsumerState<DetailReportView> createState() => _DetailReportViewState();
}

class _DetailReportViewState extends ConsumerState<DetailReportView> {
  @override
  void initState() {
    super.initState();
    ref.read(detailReportViewModel).getReport(widget.reportId);
  }

  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
        extendBody: false,
      ),
    );
  }

  PreferredSize _appBar() {
    return const PreferredSize(
      preferredSize: Size.fromHeight(80),
      child: AppAppbar(
        title: Text('Report'),
      ),
    );
  }
  
  Widget _body() {
    final isLoading = ref.watch(detailReportViewModel.select(
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
              const SizedBox(height: 24),
              _imageEvidence(),
              const SizedBox(height: 24),
              _audioEvidence(),
              const SizedBox(height: 48),
            ],
          ),
        );
  }

  Widget _trackInfo() {
    final track = ref.watch(detailReportViewModel.select(
      (value) => value.report?.track
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
    return AppChipSelector(
      reasons: ref.watch(detailReportViewModel.select(
        (value) => value.reasons
      )),
      selectedReasons: ref.watch(detailReportViewModel.select(
        (value) => value.report?.reasons ?? []
      )),
      onReasonSelected: (_) {},
    );
  }

  Widget _subjectInput() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const FieldLabel('Subject'),
        const SizedBox(height: 8),
        TextFormField(
          readOnly: true,
          initialValue: ref.watch(detailReportViewModel).report?.subject,
        ),
      ],
    );
  }

  Widget _bodyInput() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const FieldLabel('Body'),
        const SizedBox(height: 8),
        TextFormField(
          readOnly: true,
          initialValue: ref.watch(detailReportViewModel).report?.body,
          maxLines: 5,
        ),
      ],
    );
  }

  Widget _imageEvidence() {
    final images = ref.watch(detailReportViewModel.select(
      (value) => value.report?.imagePaths ?? []
    ));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        const FieldLabel('Attach image'),
        const SizedBox(height: 8),
        SizedBox(
          height: 100,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: images.length,
            itemBuilder: (context, index) => DynamicImage(
              images[index],
              width: 100,
              height: 100,
              borderRadius: BorderRadius.circular(8),
            ),
            separatorBuilder: (context, index) => const SizedBox(width: 12),
          ),
        ),
      ],
    );
  }

  Widget _audioEvidence() {
    final audios = ref.watch(detailReportViewModel.select(
      (value) => [value.report?.audioPath]
    ));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        const FieldLabel('Attach audio'),
        const SizedBox(height: 8),
        SizedBox(
          height: 100,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: audios.length,
            itemBuilder: (context, index) => AudioImageWidget(
              imagePath: AppConstantIcons.appImage,
              audioPath: audios[index],
              size: 64,
              padding: const EdgeInsets.all(18),
              borderRadius: BorderRadius.circular(8),
            ),
            separatorBuilder: (context, index) => const SizedBox(width: 12),
          )
        ),
      ],
    );
  }
}