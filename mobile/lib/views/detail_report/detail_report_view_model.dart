import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/report_model.dart';
import 'package:mobile/repositories/report_repository.dart';

final detailReportViewModel = ChangeNotifierProvider.autoDispose<DetailReportViewModel>(
  (ref) => DetailReportViewModel(ref)
);

class DetailReportViewModel extends ChangeNotifier {
  DetailReportViewModel(ChangeNotifierProviderRef ref) {
    _reportRepo = ref.read(reportRepoProvider);
  }

  late final ReportRepository _reportRepo;
  ReportModel? report;
  bool isLoading = true;
  final List<String> reasons = [
    'Copyright infringement',
    'Privacy violation',
    'Pornographic content',
    'Abuse',
    'Content appears on wrong profile',
    'Hate speech',
    'Illegal content',
  ];

  Future<void> getReport(String reportId) async {
    try {
      report = await _reportRepo.getReport(reportId);
      isLoading = false;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

}