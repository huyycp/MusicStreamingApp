import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/views/sign_up/sign_up_view_model.dart';

class GenderItem extends ConsumerWidget {
  final String genderName;
  const GenderItem(this.genderName, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return OutlinedButton.icon(
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.all(8),
        side: const BorderSide(
          color: Colors.white,
        ),
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8)
        ),
      ),
      onPressed: () {
        ref.read(signUpViewModel).genderController.text = genderName;
        context.pop();
      },
      icon: Icon(genderName == 'Male' ? Icons.man : Icons.woman),
      label: Text(genderName, style: const TextStyle(fontSize: 20))
    );
  }
}