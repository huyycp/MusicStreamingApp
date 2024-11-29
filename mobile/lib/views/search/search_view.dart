import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/views/search/search_view_model.dart';
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
  bool get wantKeepAlive => true;  

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
        _tracks(),
      ],
    );
  }

  Widget _searchBar() {
    return TextField(
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(horizontal: 80, vertical: 6),
        hintText: 'What do you want to listen to?',
        prefixIcon: Container(padding: const EdgeInsets.all(10), child: DynamicImage('assets/icons/ic_search.svg', width: 10, height: 10)),
        suffixIcon: _micBtn(),
      ),
    );
  }

  Widget _micBtn() {
    return IconButton(
      onPressed: () async {
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

  Widget _tracks() {
    final tracks = ref.watch(searchViewModel.select(
      (value) => value.tracks
    ));
    final isLoading = ref.watch(searchViewModel.select(
      (value) => value.isLoading
    ));
    return Expanded(
      child: isLoading 
        ? const Center(child: CircularProgressIndicator())
        : ListView.separated(
            itemCount: tracks.length,
            itemBuilder: (context, index) => TrackWidget(tracks[index]),
            separatorBuilder: (context, index) => const SizedBox(height: 8),
          ),
    );
  }

  void showRecordingDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return SizedBox.expand(
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
        );
      }
    );
  }

  
}

void hideRecordingDialog(BuildContext context) {
  context.pop();
}