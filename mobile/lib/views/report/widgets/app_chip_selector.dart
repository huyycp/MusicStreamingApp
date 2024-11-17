import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/report/report_view_model.dart';
import 'package:mobile/views/report/widgets/app_chip_item.dart';

class AppChipSelector extends ConsumerWidget {
  const AppChipSelector({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reasons = ref.watch(reportViewModel.select(
      (value) => value.reason
    ));
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
            isSelected: ref.watch(reportViewModel.select((value) => value.selectedReasons.contains(reason))),
            onPressed: ref.read(reportViewModel).selectReason
          )
        ).toList(),
      ),
    );
  }
}