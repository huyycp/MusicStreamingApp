import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';

class EditProfileReq {
  EditProfileReq({
    this.name,
    this.gender,
    this.image,
  });
  
  String? name;
  String? gender;
  XFile? image;

  Future<Map<String, dynamic>> toJson() async {
    final req = <String, dynamic>{
      'name': name,
      'gender': gender,
    };
    if (image != null) {
      final imageFile =  await MultipartFile.fromFile(image!.path);
      req['image'] = imageFile;
    }
    return req;
  }
}