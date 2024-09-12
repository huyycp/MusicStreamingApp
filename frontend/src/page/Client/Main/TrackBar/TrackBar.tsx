import Box from '@mui/material/Box'
import MusicInfo from './MusicInfo/MusicInfo'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import MusicTool from './MusicTool/MusicTool'
import { useMusic } from '~/hooks/useMusic'
import { MusicProvider } from '~/contents/MusicProvider'

export default function TrackBar() {
  const { music } = useMusic()
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.music.appTrackHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1
      }}
    >
      <Box
        sx={{
          flex: '0 1 446px',
          minWidth: '227px',
          maxWidth: '446px',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        <MusicInfo music={music} />
      </Box>
      <Box
        sx={{
          flex: '0 1 605px',
          minWidth: '313px',
          maxWidth: '605px',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        <MusicPlayer />
      </Box>
      <Box
        sx={{
          flex: '0 1 auto',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: 'auto'
        }}
      >
        <MusicTool />
      </Box>
      <MusicProvider musicUrl={listMusic.listMusics[currentTrackIndex].musicUrl} onNextTrack={handleNextTrack} onPreviousTrack={handlePreviousTrack}>
        <Box
          sx={{
            flex: '0 1 605px',
            minWidth: '313px',
            maxWidth: '605px',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <MusicPlayer />
        </Box>
        <Box
          sx={{
            flex: '0 1 auto',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginLeft: 'auto'
          }}
        >
          <MusicTool
            artistName={listMusic.listMusics[currentTrackIndex].artistName}
            musicImage={listMusic.listMusics[currentTrackIndex].artUrl}
            musicName={listMusic.listMusics[currentTrackIndex].name}
          />
        </Box>
      </MusicProvider>
    </Box>
  )
}
