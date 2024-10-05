import 'package:flutter/material.dart';

class BaseTabView extends StatelessWidget {
  final List<dynamic> items;
  final Widget Function(dynamic) itemWidget;
  final Future<void> Function()? onRefresh;
  final ScrollController? scrollController;
  const BaseTabView({
    required this.items,
    required this.itemWidget,
    this.onRefresh,
    this.scrollController,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: RefreshIndicator(
        onRefresh: onRefresh ?? () async {},
        child: ListView.separated(
          itemCount: items.length,
          itemBuilder: (context, index) => itemWidget(items[index]),
          separatorBuilder: (context, index) => const SizedBox(height: 8),
          controller: scrollController,
          physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
        ),
      ),
    );
  }
}