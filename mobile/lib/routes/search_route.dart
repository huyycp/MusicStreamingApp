import 'package:go_router/go_router.dart';
import 'package:mobile/views/search/search_view.dart';

class SearchRoute {
  SearchRoute._();

  static RouteBase get routes => _searchRoute;
  static const String _baseSearch = '/search';
  
  static String get search => _baseSearch;
  
  static final GoRoute _searchRoute = GoRoute(
    path: _baseSearch,
    builder: (context, state) => const SearchView(),
  );
}