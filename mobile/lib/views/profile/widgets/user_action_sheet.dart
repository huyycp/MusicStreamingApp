import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/utils/modal_bottom_sheet.dart';
import 'package:mobile/utils/snackbar.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/dynamic_image.dart';

void showUserActionsSheet(BuildContext context) {
  showAppModalBottomSheet(context: context, builder: (context) {
    return const UserActionSheet();
  });
}

class UserActionSheet extends ConsumerStatefulWidget {
  const UserActionSheet({super.key});

  @override
  ConsumerState<UserActionSheet> createState() => _UserActionSheetState();
}

class _UserActionSheetState extends ConsumerState<UserActionSheet> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _upgradePremium(),
        ],
      ),
    );
  }

  Widget _upgradePremium() {
    return BaseButton(
      onPressed: () {
        SnackBarUtils.showSnackBar(message: 'Please use web for the best experience');
        context.pop();
      },
      type: ButtonType.text,
      child: Row(
        children: [
          DynamicImage('assets/icons/app_image.png', width: 24, height: 24),
          const SizedBox(width: 8),
          const Text('Upgrade to Premium'),
        ],
      ),
    );
  }
}