import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/dto/req/pagination_list_req.dart';
import 'package:mobile/models/report_model.dart';
import 'package:mobile/repositories/report_repository.dart';

final profileViewModel = ChangeNotifierProvider.autoDispose<ProfileViewModel>(
  (ref) => ProfileViewModel(ref)
);

class ProfileViewModel extends ChangeNotifier {
  ProfileViewModel(ChangeNotifierProviderRef ref) {
    _reportRepo = ref.read(reportRepoProvider);
  }

  late final ReportRepository _reportRepo;
  List<ReportModel> reports = [];
  
  Future<void> getReports(Function(bool) onDone) async {
    try {
      final pagination = PaginationListReq(
        limit: 5,
      );
      final resp = await _reportRepo.getReports(
        pagination: pagination,
      );
      reports = resp.reports;
      notifyListeners();
    } catch (err) {
      debugPrint(err.toString());
    } 
  }
}