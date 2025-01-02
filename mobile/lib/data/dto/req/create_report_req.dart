import 'dart:io';
import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';

class CreateReportReq {
  CreateReportReq({
    required this.trackId,
    required this.reason,
    required this.subject,
    required this.body,
    required this.images,
    required this.audios,
  });

  String trackId;
  String reason;
  String subject;
  String body;
  List<XFile> images;
  List<File> audios;

  Future<Map<String, dynamic>> toJson() async {
    final imagesFiles = await Future.wait(images.map((image) async => await MultipartFile.fromFile(image.path)));
    final audioFile = await MultipartFile.fromFile(audios[0].path);
    return {
      'reason': reason,
      'subject': subject,
      'body': body,
      'image': imagesFiles,
      'audio': audioFile,
    };
  }
}
