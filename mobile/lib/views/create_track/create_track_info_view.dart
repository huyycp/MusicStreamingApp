import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/utils/validators.dart';
import 'package:mobile/views/create_track/create_track_view_model.dart';
import 'package:mobile/widgets/field_label.dart';
import 'package:mobile/views/create_track/widgets/next_step_button.dart';
import 'package:mobile/widgets/base_container.dart';

class CreateTrackInfoView extends ConsumerStatefulWidget {
  const CreateTrackInfoView({super.key});

  @override
  ConsumerState<CreateTrackInfoView> createState() => _CreateTrackInfoViewState();
}

class _CreateTrackInfoViewState extends ConsumerState<CreateTrackInfoView> {
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
        child: Form(
          key: ref.read(createTrackViewModel).trackInfoFormKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Track information',
                style: Theme.of(context).textTheme.titleLarge
              ),
              const SizedBox(height: 24),
              _trackTitleInput(),
              const SizedBox(height: 24),
              _trackDescInput(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _trackTitleInput() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const FieldLabel('Title'),
        const SizedBox(height: 8),
        TextFormField(
          validator: emptyValidator,
          decoration: const InputDecoration(
            hintText: 'Title',
          ),
          controller: ref.read(createTrackViewModel).trackTitleController,
        ),
      ],
    );
  }

  Widget _trackDescInput() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const FieldLabel('Description'),
        const SizedBox(height: 8),
        TextFormField(
          decoration: const InputDecoration(
            hintText: 'Description (optional)',
          ),
          maxLines: 10,
          controller: ref.read(createTrackViewModel).trackDescController,
        ),
      ],
    );
  }

  Widget _nextBtn() {
    return const NextStepButton('/track/create/audio');
  }
}