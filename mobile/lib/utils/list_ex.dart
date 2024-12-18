List<T> listFromJson<T>(Iterable<dynamic>? json, T Function(Map<String, dynamic>) fromJson) {
  if (json == null) return [];
  return json.map((element) => fromJson(element as Map<String, dynamic>)).toList();
}
