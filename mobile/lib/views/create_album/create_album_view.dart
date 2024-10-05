import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/create_album/create_album_view_model.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/widgets/base_container.dart';

class CreateAlbumView extends ConsumerStatefulWidget {
  const CreateAlbumView({super.key});

  @override
  ConsumerState<CreateAlbumView> createState() => _CreateAlbumViewState();
}

class _CreateAlbumViewState extends ConsumerState<CreateAlbumView> {
  @override
  Widget build(BuildContext context) {
    ref.listen(createAlbumViewModel, (prev, next) {
      if (next.isAlbumCreated == true) {
        context.push('/pick-track/${next.albumId}');
      }
    });

    return Scaffold(
      appBar: _appBar(),
      body: _body(),
      bottomNavigationBar: _createAlbumBtn(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Create album'),
      centerTitle: false,
    );
  }

  Widget _body() {
    return SingleChildScrollView(
      child: BaseContainer(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _albumImageInput(),
            const SizedBox(height: 24),
            _albumNameInput(),
          ],
        ),
      ),
    );
  }

  Widget _albumNameInput() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        FieldLabel('Album name'),
        const SizedBox(height: 8),
        TextFormField(
          validator: emptyValidator,
          decoration: InputDecoration(
            hintText: 'Album name',
          ),
          controller: ref.read(createAlbumViewModel).albumNameController,
        )
      ],
    );
  }

  Widget _albumImageInput() {
    final image = ref.watch(createAlbumViewModel.select((value) => value.albumImage));
    return Container(
      height: MediaQuery.sizeOf(context).width,
      decoration: BoxDecoration(
        border: Border.all(
          color: BUTTON_STROKE,
        ),
        borderRadius: BorderRadius.circular(20),
        image: DecorationImage(
          fit: BoxFit.cover,
          image: image != null
            ? FileImage(File(image.path))
            : AssetImage('assets/images/default_image_placeholder.png'),
        )
      ),
      child: Center(
        child: _uploadImageBtn(),
      ),
    );
  }

  Widget _uploadImageBtn() {
    return OutlinedButton(
      onPressed: () {
        ref.read(createAlbumViewModel).pickImage();
      },
      child: const Text('Upload'),
    );
  }

  Widget _createAlbumBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8)
          )
        ),
        onPressed: () {
          ref.read(createAlbumViewModel).createAlbum();
        },
        child: const Text('Create'),
      ),
    );
  }
}