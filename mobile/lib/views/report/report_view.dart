import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/report/report_view_model.dart';
import 'package:mobile/views/report/widgets/app_chip_selector.dart';
import 'package:mobile/widgets/audio_image_widget.dart';
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
        extendBody: false,
      ),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Report'),
      forceMaterialTransparency: true,
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const FieldLabel('Subject'),
        const SizedBox(height: 8),
        TextField(
          controller: ref.read(reportViewModel).subjectController,
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
        TextField(
          controller: ref.read(reportViewModel).bodyController,
          maxLines: 5,
        ),
      ],
    );
  }

  Widget _imageEvidence() {
    final images = ref.watch(reportViewModel.select(
      (value) => value.imagesEvidence
    ));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        const FieldLabel('Attach image'),
        const SizedBox(height: 8),
        SizedBox(
          height: 100,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _imageSelector(),
              const SizedBox(width: 12),
              Expanded(
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: images.length,
                  itemBuilder: (context, index) => DynamicImage(
                    images[index].path,
                    width: 100,
                    height: 100,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  separatorBuilder: (context, index) => const SizedBox(width: 12),
                ),
              ) 
            ],
          ),
        ),
      ],
    );
  }

  Widget _imageSelector() {
    return GestureDetector(
      onTap: () => ref.read(reportViewModel).selectImage(),
      child: DottedBorder(
        color: GRAY_BCK_2,
        radius: const Radius.circular(8),
        borderType: BorderType.RRect,
        dashPattern: const [5, 3],
        child: Container(
          padding: const EdgeInsets.all(36),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: DynamicImage(
              AppConstantIcons.add,
              width: 24,
              height: 24,
              color: GRAY_BCK_2,
            ),
          ),
        ),
      ),
    );
  }

  Widget _audioEvidence() {
    final audios = ref.watch(reportViewModel.select(
      (value) => value.audioEvidence
    ));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        const FieldLabel('Attach audio'),
        const SizedBox(height: 8),
        SizedBox(
          height: 100,
          child: Row(
            children: [
              _audioSelector(),
              const SizedBox(width: 12),
               Expanded(
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: audios.length,
                  itemBuilder: (context, index) => AudioImageWidget(
                    imagePath: AppConstantIcons.appImage,
                    audioPath: audios[index].path,
                    size: 64,
                    padding: const EdgeInsets.all(18),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  separatorBuilder: (context, index) => const SizedBox(width: 12),
                ),
              ),
            ],
          )
        ),
      ],
    );
  }

  Widget _audioSelector() {
    return GestureDetector(
      onTap: () => ref.read(reportViewModel).selectAudio(),
      child: DottedBorder(
        color: GRAY_BCK_2,
        radius: const Radius.circular(8),
        borderType: BorderType.RRect,
        dashPattern: const [5, 3],
        child: Container(
          padding: const EdgeInsets.all(36),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: DynamicImage(
              AppConstantIcons.add,
              width: 24,
              height: 24,
              color: GRAY_BCK_2,
            ),
          ),
        ),
      ),
    );
  }

  Widget _sendReportBtn() {
    final isValidForm = ref.watch(reportViewModel.select(
      (value) => value.isValidForm
    ));
    return AppButton(
      onPressed: isValidForm && ref.watch(reportViewModel.select((value) => value.isReportCreated == false))
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