import 'package:flutter/material.dart';
import 'package:mobile/widgets/app_appbar.dart';

PreferredSize createTrackAppBar() {
  return const PreferredSize(
    preferredSize: Size.fromHeight(80),
    child: AppAppbar(
      title: Text('Create track'),
    ),
  );
}