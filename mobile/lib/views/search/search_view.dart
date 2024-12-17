import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/home/widgets/suggested_artist_widget.dart';
import 'package:mobile/views/library/widgets/library_widget.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/views/search/search_view_model.dart';
import 'package:mobile/views/search/widgets/genre_explore_widget.dart';
import 'package:mobile/widgets/app_appbar.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:mobile/widgets/navigate_avatar.dart';
import 'package:mobile/widgets/track/track_widget.dart';
import 'package:simple_ripple_animation/simple_ripple_animation.dart';

class SearchView extends ConsumerStatefulWidget {
  const SearchView({super.key});

  @override
  ConsumerState<SearchView> createState() => _SearchViewState();
}

class _SearchViewState extends ConsumerState<SearchView> with AutomaticKeepAliveClientMixin{
  
  @override
  bool get wantKeepAlive => false;  

  @override
  void initState() {
    super.initState();
    ref.read(searchViewModel).getGenres();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return BaseContainer(
      child: Scaffold(
        appBar: _appBar(),
        body: _body(),
      ),
    );
  }

  PreferredSize _appBar() {
    return PreferredSize(
      preferredSize: const Size.fromHeight(80),
      child: AppAppbar(
        leading: _userAvatar(),
        title: const Text('Search'),
      ),
    );
  }

  Widget _userAvatar() {
    return NavigateAvatar(
      onTap: () {
        ref.read(mainViewModel).changeView(PageMenuSelection.profile);
      },
      imageSource: ref.watch(homeViewModel.select((value) => value.user?.avatarLink ?? '')),
    );
  }

  Widget _body() {
    return Column(
      children: [
        _searchBar(),
        const SizedBox(height: 24),
        Expanded(
          child: PageView(
            controller: ref.read(searchViewModel).pageController,
            physics: const NeverScrollableScrollPhysics(),
            children: [
              _exploreGenres(),
              _tracks(),
              _searchResult(),
            ],
          ),
        )
      ],
    );
  }
 
  Widget _searchBar() {
    return TextField(
      onChanged: (_) => ref.read(searchViewModel).onKeywordChanged(),
      controller: ref.read(searchViewModel).keywordController,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(horizontal: 80, vertical: 6),
        hintText: 'What do you want to listen to?',
        prefixIcon: Container(padding: const EdgeInsets.all(10), child: DynamicImage('assets/icons/ic_search.svg', width: 10, height: 10)),
        suffixIcon: _suffixIcon(),
      ),
    );
  }

  Widget _suffixIcon() {
    return ref.watch(searchViewModel.select((value) => value.currentTabIndex == 0))
      ? _micBtn()
      : _closeBtn();
  }

  Widget _micBtn() {
    return IconButton(
      onPressed: () async {
        ref.read(searchViewModel).changeTab(1);
        showRecordingDialog();
        ref.read(searchViewModel).handleRecord(context);
      },
      icon: DynamicImage(
        'assets/icons/ic_mic.svg',
        width: 16,
        height: 24,
      ),
    );
  }
  
  Widget _closeBtn() {
    return IconButton(
      onPressed: () {
        ref.read(searchViewModel).changeTab(0);
        ref.read(searchViewModel).clear();
      },
      icon: DynamicImage(
        'assets/icons/ic_close.svg',
        width: 16,
        height: 16,
      ),
    );
  }

  Widget _exploreGenres()  {
    final genres = ref.watch(searchViewModel.select(
      (value) =>  value.genres
    ));
    return GridView.count(
      addAutomaticKeepAlives: true,
      padding: const EdgeInsets.only(bottom: 75),
      crossAxisCount: 2,
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 1.4,
      physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
      children: genres.map((genre) => GenreExploreWidget(genre)).toList(),
    );
  }

  Widget _searchResult() {
    final resp = ref.watch(searchViewModel.select(
      (value) => value.searchResp
    ));
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (resp.tracks.isNotEmpty) ...[
            Text('Tracks', style: Theme.of(context).textTheme.titleLarge),
            ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 24),
              shrinkWrap: true,
              itemCount: resp.tracks.length,
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) => TrackWidget(resp.tracks[index]),
              separatorBuilder: (context, index) => const SizedBox(height: 12),
            ),
          ],
          if (resp.albums.isNotEmpty) ...[
            const SizedBox(height: 12),
            Text('Albums', style: Theme.of(context).textTheme.titleLarge),
            ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 24),
              shrinkWrap: true,
              itemCount: resp.albums.length,
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) => LibraryWidget(resp.albums[index]),
              separatorBuilder: (context, index) => const SizedBox(height: 12),
            ),
          ],
          if (resp.artists.isNotEmpty) ...[
            const SizedBox(height: 12),
            Text('Artists', style: Theme.of(context).textTheme.titleLarge),
            SizedBox(
              height: 300,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(vertical: 24),
                shrinkWrap: true,
                itemCount: resp.artists.length,
                itemBuilder: (context, index) => SuggestedArtistWidget(resp.artists[index]),
                separatorBuilder: (context, index) => const SizedBox(width: 12),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _tracks() {
    final tracks = ref.watch(searchViewModel.select(
      (value) => value.tracks
    ));
    final isLoading = ref.watch(searchViewModel.select(
      (value) => value.isLoading
    ));
    return isLoading 
      ? const Center(child: CircularProgressIndicator())
      : ListView.separated(
          itemCount: tracks.length,
          itemBuilder: (context, index) => TrackWidget(tracks[index]),
          separatorBuilder: (context, index) => const SizedBox(height: 8),
        );
  }

  void showRecordingDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return SizedBox.expand(
          child: Container(
            color: GRAY_BCK_1.withOpacity(0.5),
            child: Center(
              child: RippleAnimation(
                color: PRIMARY_COLOR,
                delay: const Duration(milliseconds: 300),
                repeat: true,
                minRadius: 100,
                maxRadius: 150,
                ripplesCount: 5,
                child: GestureDetector(
                  onTap: () {
                    ref.read(searchViewModel).handleRecord(context);
                  } ,
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: PRIMARY_BACKGROUND,
                      border: Border.all(
                        color: PRIMARY_COLOR,
                        width: 2,
                      )
                    ),
                    child: DynamicImage(
                      'assets/images/app_image.png',
                      width: 100,
                      height: 100,
                      isCircle: true,
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      }
    );
  }

  
}

void hideRecordingDialog(BuildContext context) {
  context.pop();
}