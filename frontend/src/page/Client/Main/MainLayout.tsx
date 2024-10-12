// MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import useGetTracks from '~/hooks/Tracks/useGetTracks'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'

export default function MainLayout() {
  const { data, isPending } = useGetTracks()

  const listMusic = data?.result.data

  const [fullWidth, setFullWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setFullWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box
      sx={{
        minInlineSize: '784px',
        bgcolor: '#000000',
        inlineSize: '100%',
        blockOverflow: '100vh',
        padding: '8px 8px 0px 8px',
        overflowY: 'hidden',
        overflowX: 'auto',
        maxHeight: 'auto'
      }}
    >
      <AppBar />
      {listMusic && (
        <MusicProvider initMusic={listMusic}>
          <ResizeProvider fullWidth={fullWidth}>
            <Outlet />
            <TrackBar />
          </ResizeProvider>
        </MusicProvider>
      )}
      {isPending && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <CircularProgress sx={{ color: (theme) => theme.palette.primary.main }} />
        </Box>
      )}
    </Box>
  )
}
