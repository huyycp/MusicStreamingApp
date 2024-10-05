import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';

class CreateAlbumReq {
  CreateAlbumReq({
    required this.name,
    required this.image,
  });

  String name;
  XFile image;

  Future<Map<String, dynamic>> toJson() async {
    final imageFile = await MultipartFile.fromFile(image.path);
    return {
      'name': name,
      'image': imageFile,
    };
  }
}
