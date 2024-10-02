// MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import useGetTracks from '~/hooks/Tracks/useGetTracks'
import CircularProgress from '@mui/material/CircularProgress'

export default function MainLayout() {
  const { data, isPending } = useGetTracks()

  const listMusic = data?.result.data

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
        <MusicProvider listMusic={listMusic}>
          <ResizeProvider>
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
