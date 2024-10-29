import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
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
    ref.listen(createTrackViewModel.select((value) => value.isTrackCreatedSuccess), (prev, next) {
      if (next) {
        Navigator.popUntil(context, ModalRoute.withName('main'));
      }
    });

    return Scaffold(
      appBar: _appBar(),
      body: _body(),
      bottomNavigationBar: _nextBtn(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Create track')
    );
  }

  Widget _body() {
    return BaseContainer(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: SingleChildScrollView(
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
              (value) => value.thumbnail
            ))?.path ?? '')
          )
        )
      ),
    );
  }

  Widget _thumbnailPicker() {
    
    return ElevatedButton(
      onPressed: () {
        ref.read(createTrackViewModel).pickThumbnail();
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
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: ElevatedButton(
        onPressed: () {
          ref.read(createTrackViewModel).createTrack();
        },
        child: const Text('Create'),
      ),
    );
  }
}