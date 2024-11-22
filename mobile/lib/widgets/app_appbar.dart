import 'package:flutter/material.dart';

class AppAppbar extends StatelessWidget {
  const AppAppbar({
    this.leading,
    this.title,
    this.actions = const [],
    super.key,
  });

  final Widget? leading;
  final Widget? title;
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: const Text('Home'),
      leading: leading,
      actions: actions,
      forceMaterialTransparency: true,
    );
  }
}