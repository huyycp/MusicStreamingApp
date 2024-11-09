import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';

class CreateLibraryRep {
  CreateLibraryRep({
    required this.name,
    this.image,
  });

  String name;
  XFile? image;

  Future<Map<String, dynamic>> toJson() async {
    return {
      'name': name,
      if (image != null) 'image': await MultipartFile.fromFile(image!.path),
    };
  }
}