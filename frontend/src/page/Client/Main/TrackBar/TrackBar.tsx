import Box from '@mui/material/Box'
import MusicInfo from './MusicInfo/MusicInfo'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import MusicTool from './MusicTool/MusicTool'
import { useMusic } from '~/hooks/useMusic'

export default function TrackBar() {
  const { music } = useMusic()
  return (
    <Box
      sx={{
        inlineSize: '100%',
        blockSize: (theme) => theme.music.appTrackHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          flex: '0 1 446px',
          minInlineSize: '227px',
          maxInlineSize: '446px',
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
          minInlineSize: '313px',
          maxInlineSize: '605px',
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
          marginInlineStart: 'auto'
        }}
      >
        <MusicTool />
      </Box>
    </Box>
  )
}
