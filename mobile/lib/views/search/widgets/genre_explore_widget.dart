import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/models/genre_model.dart';
import 'package:mobile/theme/color_scheme.dart';
import 'package:mobile/views/main/main_view_model.dart';
import 'package:mobile/widgets/dynamic_image.dart';
import 'package:palette_generator/palette_generator.dart';
import 'package:shimmer/shimmer.dart';

class GenreExploreWidget extends ConsumerStatefulWidget {
  const GenreExploreWidget(this.genre, {super.key});
  final GenreModel genre;

  @override
  ConsumerState<GenreExploreWidget> createState() => _GenreExploreWidgetState();
}

class _GenreExploreWidgetState extends ConsumerState<GenreExploreWidget> {
  Color themeColor = GRAY_BCK_1;
  bool isReady = false;

  @override
  void initState() {
    super.initState();
    PaletteGenerator.fromImageProvider(NetworkImage(widget.genre.imageLink)).then((palette) {
      setState(() {
        themeColor = palette.lightVibrantColor?.color ?? GRAY_BCK_1;
        isReady = true;
      });
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return isReady
      ? GestureDetector(
          onTap: () {
            ref.read(mainViewModel).openLibrary(id: widget.genre.id, isGenre: true);
          },
          child: Stack(
            children: [
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    color: themeColor,
                  ),
                ),
              ),
              Positioned(
                top: 15,
                left: 15,
                child: Text(
                  widget.genre.name,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              Positioned(
                left: 100,
                top: 40,
                child: Transform.rotate(
                  angle: 0.4,
                  child: DynamicImage(
                    widget.genre.imageLink,
                    width: 120,
                    height: 100,
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ],
          ),
        )
      : _cardShimmer();
  }

  Widget _cardShimmer() {
    return Shimmer.fromColors(
      baseColor: GRAY_BCK_1,
      highlightColor: BUTTON_STROKE,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
        ),
      ));
  }
}