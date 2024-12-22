import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/report_model.dart';
import 'package:mobile/repositories/report_repository.dart';

final reportViewModel = ChangeNotifierProvider.autoDispose<ReportViewModel>(
  (ref) => ReportViewModel(ref)
);

class ReportViewModel extends ChangeNotifier {
  ReportViewModel(ChangeNotifierProviderRef ref) {
    _reportRepo = ref.read(reportRepoProvider);
  }

  late final ReportRepository _reportRepo;
  List<ReportModel> reports = [];
  int reportLimit = 20;
  int reportPage = 1;
  bool canLoadReport = true;
  final reportScrollController = ScrollController();
  ReportStatus? status;

  void selectReportStatus(ReportStatus? status) {
    if (this.status == status) {
      this.status = null;
    } else {
      this.status = status;
    }
    notifyListeners();
  }

  Future<void> getReports({ bool refresh = false }) async {
    try {
      if (!canLoadReport) return;
      if (refresh) {
        reportPage = 1;
        if (reports.isNotEmpty) {
          reportScrollController.animateTo(0, duration: const Duration(milliseconds: 200), curve: Curves.easeInOut);
          reports.clear();
        }
      }
      final pagination = PaginationListReq(
        limit: reportLimit,
      );
      final resp = await _reportRepo.getReports(
        pagination: pagination,
        status: status,
      );
      reports = [...reports, ...resp.reports];
      if (resp.meta.currentPage < resp.meta.totalPages) {
        reportPage += 1;
        canLoadReport = true;
      } else {
        canLoadReport = false;
      }
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    }
  }

}