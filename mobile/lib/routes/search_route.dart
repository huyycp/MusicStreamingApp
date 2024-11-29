import 'package:go_router/go_router.dart';
import 'package:mobile/views/search/search_view.dart';

class SearchRoute {
  SearchRoute._();

  static RouteBase get routes => _searchRoute;
  
  static final GoRoute _searchRoute = GoRoute(
    path: '/search',
    builder: (context, state) => const SearchView(),
  );
}