// MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import { mockData } from '~/apis/data-mock'
import { useState } from 'react'

export default function MainLayout() {
  const listMusic = mockData
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const handleNextTrack = () => {
    const nextIndex = currentTrackIndex < listMusic.listMusics.length - 1 ? currentTrackIndex + 1 : 0
    setCurrentTrackIndex(nextIndex)
    return listMusic.listMusics[nextIndex]
  }

  const handlePreviousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : listMusic.listMusics.length - 1
    setCurrentTrackIndex(prevIndex)
    return listMusic.listMusics[prevIndex]
  }

  return (
    <Box
      sx={{ minInlineSize: '784px', bgcolor: '#000000', inlineSize: '100%', blockOverflow: '100vh', p: 1, overflowY: 'hidden', overflowX: 'auto' }}
    >
      <AppBar />
      <MusicProvider intialMusic={listMusic.listMusics[currentTrackIndex]} onNextTrack={handleNextTrack} onPreviousTrack={handlePreviousTrack}>
        <ResizeProvider>
          <Outlet />
          <TrackBar />
        </ResizeProvider>
      </MusicProvider>
    </Box>
  )
}
