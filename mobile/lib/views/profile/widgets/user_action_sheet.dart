import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/utils/modal_bottom_sheet.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/widgets/base_button.dart';

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
      child: Container(
        padding: const EdgeInsets.only(bottom: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _logout(),
          ],
        ),
      ),
    );
  }

  Widget _logout() {
    return AppButton(
      onPressed: () {
        context.pop();
        ref.read(homeViewModel).logout();
      },
      type: ButtonType.text,
      child: const Row(
        children: [
          Icon(Icons.logout, size: 24),
          SizedBox(width: 8),
          Text('Logout'),
        ],
      ),
    );
  }
}