import 'package:mobile/data/dto/resp/meta_resp.dart';
import 'package:mobile/models/library_model.dart';

class GetLibraryResp {
  GetLibraryResp({
    required this.meta,
    required this.libraries,
  });

  MetaResp meta;
  List<LibraryModel> libraries;

  factory GetLibraryResp.fromJson(Map<String, dynamic> json) => GetLibraryResp(
    meta: MetaResp.fromJson(json['meta']),
    libraries: List.from(json['data']?.map(
      (libraryJson) => LibraryModel.fromJson(libraryJson),
    ) ?? []),
  );
}
