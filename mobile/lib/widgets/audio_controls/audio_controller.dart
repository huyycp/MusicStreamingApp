import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mobile/widgets/dynamic_image.dart';

class AudioController extends StatefulWidget {
  final String url;
  const AudioController({required this.url, super.key});

  @override
  State<AudioController> createState() => _AudioControllerState();
}

class _AudioControllerState extends State<AudioController> {
  final player = AudioPlayer();
  Duration totalDuration = Duration.zero;

  @override
  void initState() {
    super.initState();
    player.setUrl(widget.url).then(
      (value) => setState(() {
        totalDuration = value!;
    }));
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          _bufferPositionBar(),
          const SizedBox(height: 16),
          _audioControls(),
        ],
      ),
    );
  }

  Widget _bufferPositionBar() {
    return Container(
      height: 5,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(100),
      ),
      child: StreamBuilder(
        stream: player.positionStream,
        builder: (context, snapshot) {
          final currentPosition = snapshot.data ?? Duration.zero;
          return Slider(
            value: currentPosition.inMilliseconds.toDouble(),
            min: 0,
            max: totalDuration.inMilliseconds.toDouble(),
            onChanged: (value) {
              print(value.toString());
            },
            onChangeEnd: (value) async {
              await player.seek(Duration(milliseconds: value.round()));
              setState(() {
                
              });
            },
          );
        },
      ),
    );
  }

  
  Widget _audioControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _playBtn()
      ],
    );
  }

  Widget _playBtn() {
    return ElevatedButton(
      onPressed: () async {
        if (player.playing) {
          await player.pause();
        } else {
          await player.play();
        }
      },
      child: StreamBuilder<bool>(
        stream: player.playingStream,
        builder: (context, snapshot)  {
          final isPlaying = snapshot.data ?? false;
          return DynamicImage(
            width: 24,
            height: 24,
            isCircle: true,
            color: Colors.black,
            isPlaying 
              ? 'assets/icons/ic_pause.svg'
              : 'assets/icons/ic_play.svg'
          );
        },
      ),
    );
  }
}