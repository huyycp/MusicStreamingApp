import 'package:flutter/material.dart';

class OverlayService {
  static final OverlayService instance = OverlayService._internal();
  OverlayState? overlayState;
  OverlayEntry? _overlayEntry;

  OverlayService._internal();

  void showOverlay() {
    if (overlayState == null || _overlayEntry != null) return;

    _overlayEntry = OverlayEntry(
      builder: (context) => build(context),
    );

    overlayState?.insert(_overlayEntry!);
  }

  void removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
} 
