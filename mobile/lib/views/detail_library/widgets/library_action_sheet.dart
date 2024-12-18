import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/models/library_model.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class LibraryActionSheet extends StatefulWidget {
  const LibraryActionSheet({required this.id, required this.type, super.key});
  final String id;
  final LibraryType type;

  @override
  State<LibraryActionSheet> createState() => _LibraryActionSheetState();
}

class _LibraryActionSheetState extends State<LibraryActionSheet> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.only(top: 0, right: 16, bottom: 32, left: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _editLibraryAction(),
          ],
        ),
      )
    );
  }

  Widget _editLibraryAction() {
    return GestureDetector(
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
            'assets/icons/ic_edit.svg',
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
    );
  }
}