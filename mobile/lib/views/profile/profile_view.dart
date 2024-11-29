import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/views/profile/widgets/user_action_sheet.dart';
import 'package:mobile/widgets/base_button.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class ProfileView extends ConsumerStatefulWidget {
  const ProfileView({super.key});

  @override
  ConsumerState<ProfileView> createState() => _ProfileViewState();
}

class _ProfileViewState extends ConsumerState<ProfileView> {
  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 48),
      child: Scaffold(
        body: Column(
          children: [
            _userInfo(), 
            const SizedBox(height: 24),
            _userAction(),
            const SizedBox(height: 24),
            const Expanded(
              child: Text('abv'),
            )
          ],
        )
      ),
    );
  }

  Widget _userInfo() {
    return Row(
      children: [
        _userAvatar(),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                ref.read(userRepoProvider).user!.name,
                style: Theme.of(context).textTheme.titleLarge,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Text(
                '${1} followers - ${2} following',
                style: Theme.of(context).textTheme.bodyMedium,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        )
      ],
    );
  }

  Widget _userAvatar() {
    return DynamicImage(
      ref.read(userRepoProvider).user!.avatarLink,
      width: 84,
      height: 84,
      isCircle: true,
    );
  }

  Widget _userAction() {
    return Row(
      children: [
        BaseButton(
          onPressed: () {

          },
          type: ButtonType.outlined,
          border: ButtonBorder.round,
          child: const Text('Edit'),
        ),
        const SizedBox(width: 12),
        IconButton(
          onPressed: () => showUserActionsSheet(context),
          icon: DynamicImage('assets/icons/ic_menu.svg', width: 18, height: 16),
        )
      ],
    );
  }
}