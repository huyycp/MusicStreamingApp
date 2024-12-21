import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/constants/app_constant_icons.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class SignUpAppBar extends AppBar {
  final String text;
  final BuildContext context;
  SignUpAppBar({
    required this.text, 
    required this.context,
    super.key
  }) : super(
    title: Text(
      text,
      style: Theme.of(context).textTheme.titleLarge,
    ),
    centerTitle: true,
    leading: IconButton(
      icon: DynamicImage(AppConstantIcons.chevronLeft, width: 20, height: 20),
      onPressed: () {
        context.pop();
      },
    ),
    backgroundColor: Colors.transparent,
  );
}