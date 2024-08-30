import { memo, useState } from 'react'
import Box from '@mui/material/Box'
import { mockData } from '~/apis/data-mock'
import MusicInfo from './MusicInfo/MusicInfo'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import MusicTool from './MusicTool/MusicTool'

const TrackBar = () => {
  const listMusic = mockData
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex < listMusic.listMusics.length - 1 ? prevIndex + 1 : 0))
  }

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : listMusic.listMusics.length - 1))
  }

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
        <MusicInfo
          artistName={listMusic.listMusics[currentTrackIndex].artistName}
          musicImage={listMusic.listMusics[currentTrackIndex].artUrl}
          musicName={listMusic.listMusics[currentTrackIndex].name}
        />
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
        <MusicPlayer
          musicUrl={listMusic.listMusics[currentTrackIndex].musicUrl}
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
        />
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
    </Box>
  )
}

export default memo(TrackBar)
