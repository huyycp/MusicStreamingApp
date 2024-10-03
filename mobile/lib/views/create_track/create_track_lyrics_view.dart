import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
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
    return Scaffold(
      appBar: _appBar(),
      body: _body(),
      bottomNavigationBar: _nextBtn(),
    );
  }

  AppBar _appBar() {
    return AppBar(
      title: const Text('Create track')
    );
  }

  Widget _body() {
    return BaseContainer(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: SingleChildScrollView(
        child: Column(
          children: [
            FieldLabel('Lyrics'),
            const SizedBox(height: 8),
            TextFormField(
              decoration: InputDecoration(
                hintText: 'Lyrics',
              ),
              maxLines: 10,
              controller: ref.read(createTrackViewModel).trackLyricsController,
            ),
          ],
        ),
      ),
    );
  }

  Widget _nextBtn() {
    return NextStepButton('/track/create/thumbnail');
  }
}