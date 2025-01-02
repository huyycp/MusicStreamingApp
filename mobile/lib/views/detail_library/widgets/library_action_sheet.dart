import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/views/detail_library/detail_library_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class LibraryActionSheet extends ConsumerStatefulWidget {
  const LibraryActionSheet({required this.id, required this.type, super.key});
  final String id;
  final LibraryType type;

  @override
  ConsumerState<LibraryActionSheet> createState() => _LibraryActionSheetState();
}

class _LibraryActionSheetState extends ConsumerState<LibraryActionSheet> {
  @override
  Widget build(BuildContext context) {
    return PopScope(
      onPopInvoked: (_) {
        FocusScope.of(context).unfocus();
      },
      child: SafeArea(
        child: Container(
          padding: const EdgeInsets.only(top: 0, right: 16, bottom: 32, left: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _editLibraryAction(),
            ],
          ),
        )
      ),
    );
  }

  Widget _editLibraryAction() {
    return Visibility(
      visible: 
        widget.type == LibraryType.playlist || 
        (widget.type == LibraryType.album && (ref.watch(detailLibraryViewModel).library?.owners.where((owner) => owner.id == ref.watch(userRepoProvider).user?.id).isNotEmpty ?? false)),
      child: GestureDetector(
        onTap: () {
          context.pop();
          if (widget.type == LibraryType.album) {
            context.push('${RouteNamed.createAlbum}/${widget.id}');
          } else if (widget.type == LibraryType.playlist) {
            context.push('${RouteNamed.createPlaylist}/${widget.id}');
          }
        },
        child: Row(
          children: [
            DynamicImage(
              AppConstantIcons.edit,
              width: 24,
              height: 24,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                'Edit library',
                style: Theme.of(context).textTheme.titleMedium,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }
}