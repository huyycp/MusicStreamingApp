import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/create_track_app_bar.dart';
import 'package:mobile/views/create_track/widgets/next_step_button.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class CreateTrackThumbnailView extends ConsumerStatefulWidget {
  const CreateTrackThumbnailView({super.key});

  @override
  ConsumerState<CreateTrackThumbnailView> createState() => _CreateTrackThumbnailViewState();
}

class _CreateTrackThumbnailViewState extends ConsumerState<CreateTrackThumbnailView> {
  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: createTrackAppBar(),
        body: _body(),
        bottomNavigationBar: _nextBtn(),
      ),
    );
  }

  Widget _body() {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const FieldLabel('Thumbnail'),
          const SizedBox(height: 8),
          _thumbnailDisplay(),
          const SizedBox(height: 16),
          _thumbnailPicker(),
        ],
      ),
    );
  }
  
  Widget _thumbnailDisplay() {
    return Container(
      height: 0.9 * MediaQuery.sizeOf(context).width,
      decoration: BoxDecoration(
        border: Border.all(
          color: TRACK_LINE
        ),
        borderRadius: BorderRadius.circular(16),
        image: DecorationImage(
          image: FileImage(
            File(ref.watch(createTrackViewModel.select(
              (value) => value.trackThumbnail
            ))?.path ?? '')
          )
        )
      ),
    );
  }

  Widget _thumbnailPicker() {
    return AppButton(
      onPressed: () {
        ref.read(createTrackViewModel).selectThumbnail();
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          DynamicImage(
            'assets/icons/ic_upload.svg',
            width: 16,
            height: 16,
          ),
          const SizedBox(width: 8),
          const Text('Upload')
        ],
      ),
    );
  }

  Widget _nextBtn() {
    return NextStepButton(
      destination: RouteNamed.createTrackGenre,
      enabled: ref.watch(createTrackViewModel.select((value) => value.isValidTrackThumbnail)),
    );
  }
}