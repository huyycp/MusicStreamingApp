import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/utils/snackbar.dart';
import 'package:mobile/views/edit_profile/edit_profile_view_model.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class EditProfileView extends ConsumerStatefulWidget {
  const EditProfileView({super.key});

  @override
  ConsumerState<EditProfileView> createState() => _EditProfileViewState();
}

class _EditProfileViewState extends ConsumerState<EditProfileView> {
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
      forceMaterialTransparency: true,
      title: Text(
        'Edit profile',
        style: Theme.of(context).textTheme.titleMedium,
      ),
      centerTitle: true,
      leading: IconButton(
        onPressed: () {
          context.pop();
        },
        icon: DynamicImage(
          'assets/icons/ic_close_light.svg',
          width: 24,
          height: 24,
          color: Colors.grey[500],
        ),
      ),
      actions: [
        AppButton(
          onPressed: () {
            ref.read(editProfileViewModel).editProfile((isDone) {
              if (isDone) {
                context.pop(isDone);
                SnackBarUtils.showSnackBar(message: 'Update profile successfully', status: MessageTypes.success);
              } else {
                SnackBarUtils.showSnackBar(message: 'Update profile failed', status: MessageTypes.error);
              }
            });
          },
          type: ButtonType.text,
          child: const Text('Save'),
        )
      ],
    );
  }

  Widget _body() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        _avatar(),
        const SizedBox(height: 24),
        _name(),
      ]
    );
  }
  
  Widget _avatar() {
    final avatarSource = ref.watch(editProfileViewModel.select(
      (value) => value.image != null ? value.image?.path : value.user?.avatarLink
    )) ?? 'assets/images/default_image_placeholder.png';
    return GestureDetector(
      onTap: () => ref.read(editProfileViewModel).pickImage(),
      child: SizedBox(
        width: 150,
        height: 150,
        child: Stack(
          children: [
            Positioned.fill(
              child: DynamicImage(
                avatarSource,
                width: 100,
                height: 100,
                isCircle: true,
              ),
            ),
            Positioned(
              right: 10,
              bottom: 10,
              child: Container(
                padding: const EdgeInsets.all(6),
                decoration: const BoxDecoration(
                  color: GRAY_BCK_2,
                  shape: BoxShape.circle
                ),
                child: DynamicImage(
                  'assets/icons/ic_camera.svg',
                  width: 24,
                  height: 24,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _name() {
    return Row(
      children: [
        Text('Name', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(width: 12),
        Expanded(
          child: TextFormField(
            decoration: const InputDecoration(
              filled: false,
              border: UnderlineInputBorder(),
              contentPadding: EdgeInsets.zero
            ),
            controller: ref.read(editProfileViewModel).nameController,
          ),
        )
      ],
    );
  }
}