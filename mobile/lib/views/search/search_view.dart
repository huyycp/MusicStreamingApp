import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/home/home_view_model.dart';
import 'package:mobile/views/search/search_view_model.dart';
import 'package:mobile/widgets/app_appbar.dart';
import 'package:mobile/widgets/base_container.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:record/record.dart';
import 'package:simple_ripple_animation/simple_ripple_animation.dart';

class SearchView extends ConsumerStatefulWidget {
  const SearchView({super.key});

  @override
  ConsumerState<SearchView> createState() => _SearchViewState();
}

class _SearchViewState extends ConsumerState<SearchView> {
  @override
  Widget build(BuildContext context) {
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
    return Container(
      padding: const EdgeInsets.all(8),
      child: DynamicImage(
        ref.watch(homeViewModel.select((value) => value.user?.avatarLink ?? '')),
        width: 10,
        height: 20,
        isCircle: true,
      ),
    );
  }

  Widget _body() {
    return Column(
      children: [
        _searchBar(),
        const SizedBox(height: 24),
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