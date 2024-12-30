import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/track_model.dart';
import 'package:mobile/repositories/report_repository.dart';
import 'package:mobile/repositories/track_repository.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/utils/ui/snackbar.dart';

final createReportViewModel = ChangeNotifierProvider.autoDispose<CreateReportViewModel>(
  (ref) => CreateReportViewModel(
    reportRepo: ref.read(reportRepoProvider),
    trackRepo: ref.read(trackRepoProvider),
  )
);

class CreateReportViewModel extends ChangeNotifier {
  CreateReportViewModel({
    required ReportRepository reportRepo,
    required TrackRepository trackRepo,
  }) : _reportRepo = reportRepo,
       _trackRepo = trackRepo {
    subjectController.addListener(checkValidForm);
    bodyController.addListener(checkValidForm);
  }

  final ReportRepository _reportRepo;
  final TrackRepository _trackRepo;
  TrackModel? track;
  final List<String> reasons = [
    'Copyright infringement',
    'Privacy violation',
    'Pornographic content',
    'Abuse',
    'Content appears on wrong profile',
    'Hate speech',
    'Illegal content',
  ];
  List<String> selectedReasons = [];
  final subjectController = TextEditingController();
  final bodyController = TextEditingController();
  bool? isReportCreated = false;
  bool isLoading = true;
  bool isValidForm = false;
  List<XFile> imagesEvidence = [];
  List<PlatformFile> audioEvidence = [];

  Future<void> getTrack(String trackId) async {
    try {
      track = await _trackRepo.getTrack(id: trackId);
      isLoading = false;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  void selectReason(String reason) {
    if (selectedReasons.contains(reason)) {
      selectedReasons.remove(reason);
      selectedReasons = [...selectedReasons];
    } else {
      selectedReasons = [...selectedReasons, reason];
    }
    checkValidForm();
  }

  Future<void> createReport() async {
    try {
      isReportCreated = null;
      notifyListeners();
      final report = await _reportRepo.createReport(
        trackId: track!.id,
        reason: selectedReasons[0],
        subject: subjectController.text,
        body: bodyController.text,
        images: imagesEvidence,
        audios: audioEvidence,
      );
      if (report != null) {
        isReportCreated = true;
        SnackBarUtils.showSnackBar(message: 'Report sent', status: MessageTypes.success);
        RouteConfig.instance.pop();
      } else {
        isReportCreated = false;
        SnackBarUtils.showSnackBar(message: 'Report cannot be sendt', status: MessageTypes.error);
      }
      notifyListeners();
    } catch (err) {
      isReportCreated = false;
      notifyListeners();
      SnackBarUtils.showSnackBar(message: 'Report cannot be sent', status: MessageTypes.error);
      debugPrint(err.toString());
    }
  }

  void checkValidForm() {
    isValidForm = (
      selectedReasons.isNotEmpty &&
      subjectController.text.isNotEmpty &&
      bodyController.text.isNotEmpty && 
      imagesEvidence.isNotEmpty &&
      audioEvidence.isNotEmpty
    );
    notifyListeners();
  }

  Future<void> selectImage() async {
    try {
      final ImagePicker picker = ImagePicker();
      final result = await picker.pickMultiImage();
      if (result.isNotEmpty) {
        imagesEvidence = [...result, ...imagesEvidence];
        imagesEvidence = imagesEvidence.sublist(0, imagesEvidence.length < 5 ? imagesEvidence.length : 5);
        checkValidForm();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }

  Future<void> selectAudio() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['m4a', 'mp3', 'wav'],
      );
      if (result != null) {
        audioEvidence = result.files;
        checkValidForm();
      }
    } catch (err) {
      debugPrint(err.toString());
    }
  }
}
