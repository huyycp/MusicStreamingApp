import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/views/create_track/widgets/create_track_app_bar.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/views/create_track/widgets/next_step_button.dart';
import 'package:mobile/widgets/base_container.dart';

class CreateTrackLyricsView extends ConsumerStatefulWidget {
  const CreateTrackLyricsView({super.key});

  @override
  ConsumerState<CreateTrackLyricsView> createState() => _CreateTrackLyricsViewState();
}

class _CreateTrackLyricsViewState extends ConsumerState<CreateTrackLyricsView> {
  @override
  Widget build(BuildContext context) {
    return BaseContainer(
      child: Scaffold(
        appBar: createTrackAppBar(),
        body: _body(),
        bottomNavigationBar: _nextBtn(),
      ),
    );
  }

  Widget _body() {
    return SingleChildScrollView(
      child: Column(
        children: [
          const FieldLabel('Lyrics'),
          const SizedBox(height: 8),
          TextFormField(
            decoration: const InputDecoration(
              hintText: 'Lyrics',
            ),
            maxLines: 10,
            controller: ref.read(createTrackViewModel).trackLyricsController,
          ),
        ],
      ),
    );
  }

  Widget _nextBtn() {
    return NextStepButton(
      destination: RouteNamed.createTrackThumbnail,
      enabled: true,
    );
  }
}