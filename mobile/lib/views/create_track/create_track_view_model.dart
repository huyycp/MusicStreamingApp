import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mobile/repositories/track_repository.dart';

final createTrackViewModel = ChangeNotifierProvider.autoDispose<CreateTrackViewModel>(
  (ref) => CreateTrackViewModel(
    trackRepo: ref.read(trackRepoProvider)
  )
);

class CreateTrackViewModel extends ChangeNotifier {
  CreateTrackViewModel({
    required TrackRepository trackRepo
  }) : _trackRepo = trackRepo;

  final TrackRepository _trackRepo;

  /// Create track: Track info
  final trackInfoFormKey = GlobalKey<FormState>();
  final trackTitleController = TextEditingController();
  final trackDescController = TextEditingController();

  /// Create track: Track audio
  PlatformFile? audioFile;
  final AudioPlayer _player = AudioPlayer();

  /// Create track: Lyrics
  final trackLyricsController = TextEditingController();

  /// Create track: Thumbnails
  XFile? thumbnail;

  bool isTrackCreatedSuccess = false;
  
  Future<void> pickAudio() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        // allowedExtensions: ['m4a', 'mp3', 'wav'],
      );
      if (result != null) {
        audioFile = result.files.single;
        await _player.setUrl(audioFile!.path!);
        debugPrint(_player.duration!.inMilliseconds.toString());
        debugPrint(audioFile!.name);
        notifyListeners();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> pickThumbnail() async {
    final ImagePicker picker = ImagePicker();
    thumbnail = await picker.pickImage(source: ImageSource.gallery);
    if (thumbnail != null) {
      notifyListeners();
    }
  }

  Future<void> createTrack() async {
    isTrackCreatedSuccess = await _trackRepo.createTrack(
      title: trackTitleController.text, 
      description: trackDescController.text,
      audio: File(audioFile!.path!),
      lyrics: trackLyricsController.text,
      thumbnail: thumbnail!,
    );
    notifyListeners();
  }
}