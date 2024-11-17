import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/library/base_tab_view.dart';
import 'package:mobile/views/library/library_view_model.dart';
import 'package:mobile/views/library/widgets/library_widget.dart';

class LibraryListView extends ConsumerStatefulWidget {
  const LibraryListView({super.key});

  @override
  ConsumerState<LibraryListView> createState() => _LibraryListViewState();
}

class _LibraryListViewState extends ConsumerState<LibraryListView> {
  @override
  void initState() {
    super.initState();
    ref.read(libraryViewModel).getLibraries();
  }

  Widget itemWidget(dynamic library) => LibraryWidget(library);
  
  @override
  Widget build(BuildContext context) {
    final libraries = ref.watch(libraryViewModel.select(
      (value) => value.libraries
    ));
    return BaseTabView(
      items: libraries,
      itemWidget: itemWidget,
      onRefresh: () => ref.read(libraryViewModel).getLibraries(refresh: true),
      scrollController: ref.read(libraryViewModel).libraryScrollController,
      isLoading: ref.watch(libraryViewModel.select((value) => value.isLoadingLibraries)),
    );
  }
}