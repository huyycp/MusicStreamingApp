import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_images.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/ui/snackbar.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/create_album/create_album_view_model.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/loading_widget.dart';

class CreateAlbumView extends ConsumerStatefulWidget {
  const CreateAlbumView({this.id, super.key});
  final String? id;

  @override
  ConsumerState<CreateAlbumView> createState() => _CreateAlbumViewState();
}

class _CreateAlbumViewState extends ConsumerState<CreateAlbumView> {
  @override
  void initState() {
    super.initState();
    if (widget.id != null) ref.read(createAlbumViewModel).getLibraryInfo(widget.id!);
  }
  
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
    final imagePath = ref.watch(createAlbumViewModel.select((value) => value.albumImagePath));
    return GestureDetector(
      onTap: () => ref.read(createAlbumViewModel).pickImage(),
      child: Container(
        height: 300,
        decoration: BoxDecoration(
          border: Border.all(
            color: BUTTON_STROKE,
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: image == null
          ? imagePath == null
            ? Center(
              child: DynamicImage(
                AppConstantImages.placeHolder,
                width: 88,
                height: 88,
                color: BUTTON_STROKE,
              ),
            )
            : DynamicImage(
              imagePath,
              width: MediaQuery.sizeOf(context).width,
              height: 300,
              borderRadius: BorderRadius.circular(20),
            )
          : DynamicImage(
            image.path,
            width: MediaQuery.sizeOf(context).width,
            height: 300,
            borderRadius: BorderRadius.circular(20),
          )
      ),
    );
  }

  Widget _createAlbumBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: AppButton(
        type: ButtonType.elevated,
        border: ButtonBorder.square,
        onPressed: ref.watch(createAlbumViewModel.select((value) => value.isAlbumCreated == false & value.isValidInfor)) 
          ? widget.id == null
              ? () {
                ref.read(createAlbumViewModel).createAlbum();
              }
              : () {
                ref.read(createAlbumViewModel).editAlbum(widget.id!, (isDone) {
                  if (isDone) {
                    SnackBarUtils.showSnackBar(message: 'Edit album successfully', status: MessageTypes.success);
                    context.pop();
                    ref.read(detailLibraryViewModel).getLibrary(widget.id!);
                    ref.read(homeViewModel).getRecommendAlbums();
                  } else {
                    SnackBarUtils.showSnackBar(message: 'Edit album failed', status: MessageTypes.error);
                  }
                });
              }
          : null,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            LoadingWidget(visible: ref.watch(createAlbumViewModel.select((value) => value.isAlbumCreated == null))),
            Text(widget.id == null ? 'Create' : 'Save'),
          ],
        ),
      ),
    );
  }
}