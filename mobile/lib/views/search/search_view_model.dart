import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/resp/search_resp.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/genre_repository.dart';
import 'package:mobile/repositories/search_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/utils/snackbar.dart';
import 'package:mobile/views/search/search_view.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:record/record.dart';

final searchViewModel = ChangeNotifierProvider.autoDispose<SearchViewModel>(
  (ref) => SearchViewModel(
    trackRepo: ref.read(trackRepoProvider),
    genreRepo: ref.read(genreRepoProvider),
    searchRepo: ref.read(searchRepoProvider),
  )
);

class SearchViewModel extends ChangeNotifier {
  SearchViewModel({
    required TrackRepository trackRepo,
    required GenreRepository genreRepo,
    required SearchRepository searchRepo,
  }) : _trackRepo = trackRepo,
       _genreRepo = genreRepo,
       _searchRepo = searchRepo {
    audioRecorder = AudioRecorder();
    audioRecorder.onStateChanged().listen((state) {
      recordState = state;
      notifyListeners();
    });
  }

  final TrackRepository _trackRepo;
  final GenreRepository _genreRepo;
  final SearchRepository _searchRepo;
  late final AudioRecorder audioRecorder;
  RecordState recordState = RecordState.stop;
  bool isLoading = false;
  List<TrackModel> tracks = [];
  final maxRecordingDuration = 30 * 1000;
  Timer? recordingTimer;
  double recordingProgress = 0;
  int refreshDuration = 100;
  double recordingDuration = 0;
  List<GenreModel> genres = [];
  SearchResp searchResp = SearchResp.fromJson({});
  final keywordController = TextEditingController();
  Timer? deboundTimer;
  final pageController = PageController();
  int currentTabIndex = 0;

  void changeTab(int newIndex) {
    currentTabIndex = newIndex;
    pageController.jumpToPage(currentTabIndex);
    notifyListeners();
  }

  Future<void> getGenres() async {
    genres = await _genreRepo.getGenres();
    notifyListeners();
  }

  Future<void> handleRecord(BuildContext context) async {
    try {
      if (await audioRecorder.hasPermission()) {
        if (recordState == RecordState.record) {
          final path = await audioRecorder.stop();
          hideRecordingDialog(context);
          stopTimer();
          searchByAudio(path);
        } else {
          const config = RecordConfig(
            encoder: AudioEncoder.aacLc,
            numChannels: 1,
          );
          final path = join((await getApplicationDocumentsDirectory()).path, 'audio_${DateTime.now().millisecondsSinceEpoch}.m4a');
          audioRecorder.start(
            config,
            path: path,
          ).timeout(Duration(milliseconds: maxRecordingDuration));
          startTimer();
          tracks = [];
          notifyListeners();
        }
      }
    } catch (err) {
      debugPrint(err.toString());
      final path = await audioRecorder.stop();
      hideRecordingDialog(context);
      stopTimer();
      searchByAudio(path);
    }
  }

  void startTimer() {
    recordingTimer = Timer.periodic(Duration(milliseconds: refreshDuration), (timer) {
      recordingDuration += refreshDuration;
      recordingProgress += recordingDuration / maxRecordingDuration / 1000;
    });
  }

  void stopTimer() {
    if (recordingTimer != null) {
      recordingTimer!.cancel(); 
      recordingDuration = 0;
      recordingProgress = 0;
    }
  }

  Future<void> searchByAudio(String? path) async {
    try {
      if (path == null || path.isEmpty) return;
      debugPrint(path);
      isLoading = true;
      notifyListeners();
      tracks = await _trackRepo.getTrackByAudio(path).timeout(const Duration(seconds: 30));
      isLoading = false;
      notifyListeners();
      if (tracks.isEmpty) {
        SnackBarUtils.showSnackBar(message: 'Nothing match');
      }
    } catch (err) {
      debugPrint(err.toString());
      isLoading = false;
      notifyListeners();
      SnackBarUtils.showSnackBar(message: 'Cannot recognize, please try again');
    }
  }

  void onKeywordChanged() {
    if (deboundTimer?.isActive ?? false) deboundTimer?.cancel();
    if (keywordController.text.isEmpty) return;
    if (currentTabIndex != 1) changeTab(2);
    deboundTimer = Timer(const Duration(milliseconds: 1000), () async {
      searchResp = await _searchRepo.search(keywordController.text);
      notifyListeners();
    });
  }

  void clear() {
    keywordController.clear();
    searchResp = SearchResp.fromJson({});
    tracks.clear();
  }
}