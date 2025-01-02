import 'package:flutter/material.dart';
import 'package:mobile/theme/color_scheme.dart';

class StatusDialogWidget extends StatelessWidget {
  final String statusMessage;
  const StatusDialogWidget(this.statusMessage, {super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      insetPadding: const EdgeInsets.all(30),
      backgroundColor: PRIMARY_BACKGROUND,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: Colors.white)
      ),
      child: SizedBox(
        width: 0.8 * MediaQuery.sizeOf(context).width,
        height: 200,
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(color: Colors.grey),
              const SizedBox(height: 10),
              Text(statusMessage),
            ],
          ),
        ),
      ),
    );
  }
}