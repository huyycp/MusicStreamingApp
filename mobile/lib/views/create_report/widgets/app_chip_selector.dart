import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/create_report/widgets/app_chip_item.dart';

class AppChipSelector extends ConsumerWidget {
  const AppChipSelector({
    super.key,
    required this.reasons,
    required this.selectedReasons,
    required this.onReasonSelected,
  });

  final List<String> reasons;
  final List<String> selectedReasons;
  final Function(String) onReasonSelected;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: GRAY_BCK_1,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: reasons.map(
          (reason) => AppChipItem(
            text: reason,
            isSelected: selectedReasons.contains(reason),
            onPressed: onReasonSelected
          )
        ).toList(),
      ),
    );
  }
}