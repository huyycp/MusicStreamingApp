import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/create_album/create_album_view_model.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/loading_widget.dart';

class CreateAlbumView extends ConsumerStatefulWidget {
  const CreateAlbumView({super.key});

  @override
  ConsumerState<CreateAlbumView> createState() => _CreateAlbumViewState();
}

class _CreateAlbumViewState extends ConsumerState<CreateAlbumView> {
  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvoked: (_) {
        ref.read(libraryViewModel)
          ..getLibraries(refresh: true)
          ..getAlbums(refresh: true);
      },
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
        bottomNavigationBar: _createAlbumBtn(),
      ),
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
        const FieldLabel('Album name'),
        const SizedBox(height: 8),
        TextFormField(
          validator: emptyValidator,
          decoration: const InputDecoration(
            hintText: 'Album name',
          ),
          controller: ref.read(createAlbumViewModel).albumNameController,
        )
      ],
    );
  }

  Widget _albumImageInput() {
    final image = ref.watch(createAlbumViewModel.select((value) => value.albumImage));
    return GestureDetector(
      onTap: () => ref.read(createAlbumViewModel).pickImage(),
      child: Container(
        padding: image != null ? EdgeInsets.zero : const EdgeInsets.all(60),
        height: MediaQuery.sizeOf(context).width,
        decoration: BoxDecoration(
          border: Border.all(
            color: BUTTON_STROKE,
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: image != null
          ? DynamicImage(
              image.path,
              width: MediaQuery.sizeOf(context).width,
              height: MediaQuery.sizeOf(context).width,
              borderRadius: BorderRadius.circular(20),
            )
          : DynamicImage(
            'assets/images/default_image_placeholder.png',
            width: 32,
            height: 32,
            color: GRAY_BCK_2,
          ),
      ),
    );
  }

  Widget _createAlbumBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: BaseButton(
        type: ButtonType.elevated,
        border: ButtonBorder.square,
        onPressed: ref.watch(createAlbumViewModel.select((value) => value.isAlbumCreated == false & value.isValidInfor)) 
          ? () {
            ref.read(createAlbumViewModel).createAlbum();
          }
          : null,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            LoadingWidget(visible: ref.watch(createAlbumViewModel.select((value) => value.isAlbumCreated == null))),
            const Text('Create'),
          ],
        ),
      ),
    );
  }
}