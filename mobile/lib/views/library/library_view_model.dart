import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final libraryViewModel = ChangeNotifierProvider<LibraryViewModel>(
  (ref) => LibraryViewModel()
);

class LibraryViewModel extends ChangeNotifier {
  
}