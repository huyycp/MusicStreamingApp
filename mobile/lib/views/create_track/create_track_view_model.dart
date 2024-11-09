import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/utils/audio_player_controller.dart';

final createTrackViewModel = ChangeNotifierProvider<CreateTrackViewModel>(
  (ref) => CreateTrackViewModel(
    trackRepo: ref.read(trackRepoProvider)
  )
);

class CreateTrackViewModel extends ChangeNotifier {
  CreateTrackViewModel({
    required TrackRepository trackRepo
  }) : _trackRepo = trackRepo {
    trackTitleController.addListener(checkValidTrackInfo);
  }

  final TrackRepository _trackRepo;

  /// Create track: Track info
  final trackInfoFormKey = GlobalKey<FormState>();
  final trackTitleController = TextEditingController();
  final trackDescController = TextEditingController();

  /// Create track: Track audio
  PlatformFile? trackAudio;
  final audioController = AudioPlayerController();

  /// Create track: Lyrics
  final trackLyricsController = TextEditingController();

  /// Create track: Thumbnails
  XFile? trackThumbnail;

  /// Create track: Genre
  List<GenreModel> trackGenres = const [];

  bool isValidTrackInfo = false;
  bool isValidTrackAudio = false;
  bool isValidTrackThumbnail = false;
  bool isValidTrackGenre = false;
  bool isTrackCreatedSuccess = false;
  
  Future<void> selectAudio() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        // allowedExtensions: ['m4a', 'mp3', 'wav'],
      );
      if (result != null) {
        trackAudio = result.files.single;
        await audioController.setPlaylist(tracks: [
          TrackModel(
            id: '',
            albumId: '',
            name: trackTitleController.text,
            imageLink: '', 
            audioLink: trackAudio!.path!
          )
        ]);
        checkValidTrackAudio();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> selectThumbnail() async {
    final ImagePicker picker = ImagePicker();
    final result = await picker.pickImage(source: ImageSource.gallery);
    if (result != null) {
      trackThumbnail = result;
      checkValidThumbnail();
    }
  }

  Future<void> selectGenres(GenreModel genre) async {
    trackGenres = [ genre ];
    checkValidTrackGenre();
  }

  Future<void> createTrack() async {
    debugPrint(trackTitleController.text);
    isTrackCreatedSuccess = await _trackRepo.createTrack(
      title: trackTitleController.text, 
      description: trackDescController.text,
      audio: File(trackAudio!.path!),
      lyrics: trackLyricsController.text,
      thumbnail: trackThumbnail!,
      genreId: trackGenres.first.id,
    );
    notifyListeners();
  }

  void checkValidTrackInfo() {
    isValidTrackInfo = trackTitleController.text.isNotEmpty;
    notifyListeners();
  }

  void checkValidTrackAudio() {
    isValidTrackAudio = (trackAudio != null);
    notifyListeners();
  }

  void checkValidThumbnail() {
    isValidTrackThumbnail = (trackThumbnail != null);
    notifyListeners();
  }

  void checkValidTrackGenre() {
    isValidTrackGenre = trackGenres.isNotEmpty;
    notifyListeners();
  }

  void clear() {
    trackTitleController.clear();
    trackDescController.clear();
    trackAudio = null;
    trackLyricsController.clear();
    trackThumbnail = null;
    trackGenres.clear();
    isTrackCreatedSuccess = false;
  }
}