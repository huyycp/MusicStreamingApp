import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class BaseTabView extends ConsumerWidget {
  final List<dynamic> items;
  final Widget Function(dynamic) itemWidget;
  final Future<void> Function()? onRefresh;
  final ScrollController? scrollController;
  final bool isLoading;
  const BaseTabView({
    required this.items,
    required this.itemWidget,
    this.onRefresh,
    this.scrollController,
    required this.isLoading,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: isLoading
        ? const Center(child: CircularProgressIndicator())
        : items.isNotEmpty
          ? RefreshIndicator(
            onRefresh: onRefresh ?? () async {},
            child: ListView.separated(
              itemCount: items.length,
              itemBuilder: (context, index) => itemWidget(items[index]),
              separatorBuilder: (context, index) => const SizedBox(height: 16),
              controller: scrollController,
              physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
            ),
          )
          : Container(),
    );
  }
}