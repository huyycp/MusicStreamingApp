import 'dart:io';

import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';

class CreateTrackDto {
  CreateTrackDto({
    required this.title,
    this.description = '',
    required this.audio,
    this.lyrics = '',
    required this.thumbnail,
  });

  String title;
  String description;
  File audio;
  String lyrics;
  XFile thumbnail;

  Future<Map<String, dynamic>> toJson() async {
    final audioFile = await MultipartFile.fromFile(audio.path);
    final thumbnailFile = await MultipartFile.fromFile(thumbnail.path);
    return {
      'name': title,
      'description': description,
      'audio': audioFile,
      'lyrics': lyrics,
      'image': thumbnailFile,
    };
  }
}
