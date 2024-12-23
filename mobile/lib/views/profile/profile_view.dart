import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/repositories/user_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/views/profile/profile_view_model.dart';
import 'package:mobile/views/profile/widgets/report_widget.dart';
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
  void initState() {
    super.initState();
    ref.read(profileViewModel).getReports((isDone) {});
  }

  @override
  Widget build(BuildContext context) {
    final isAvailableReport = ref.watch(profileViewModel.select(
      (value) => value.reports.isNotEmpty
    ));
    return BaseContainer(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 48),
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              _userInfo(), 
              const SizedBox(height: 24),
              _userAction(),
              const SizedBox(height: 24),
              isAvailableReport
                ? _reports()
                : Text(
                    'No recent activity',
                    style: Theme.of(context).textTheme.titleLarge
                  )
            ],
          ),
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
                ref.watch(userRepoProvider).user?.name ?? 'User',
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
      ref.watch(userRepoProvider).user?.avatarLink ?? '',
      width: 84,
      height: 84,
      isCircle: true,
    );
  }

  Widget _userAction() {
    return Row(
      children: [
        AppButton(
          onPressed: () async {
            final result = await context.push(RouteNamed.editProfile);
            if (result == true) {
              ref.read(userRepoProvider).getCurrentUser();
            }
          },
          type: ButtonType.outlined,
          border: ButtonBorder.round,
          child: const Text('Edit'),
        ),
        const SizedBox(width: 12),
        IconButton(
          onPressed: () => showUserActionsSheet(context),
          icon: DynamicImage(AppConstantIcons.menu, width: 18, height: 16),
        )
      ],
    );
  }

  Widget _reports() {
    final reports = ref.watch(profileViewModel.select(
      (value) => value.reports
    ));
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Reports',
                style: Theme.of(context).textTheme.titleLarge,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(width: 12),
            AppButton(
              onPressed: () {
                context.push(RouteNamed.report);
              },
              type: ButtonType.text,
              child: const Text('View all'),
            )
          ],
        ),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: reports.length,
          itemBuilder: (context, index) => ReportWidget(reports[index]), 
          separatorBuilder: (context, index) => const SizedBox(height: 12),
        )
      ],
    );
  }
}