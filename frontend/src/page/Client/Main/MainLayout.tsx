// MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import useGetAlbums from '~/hooks/Album/useGetAlbums'
import { ITrack } from '~/type/Tracks/ITrack'

export default function MainLayout() {
  const { data, isPending } = useGetAlbums(100, 1)
  const listAlbumId = data && data.result && data.result.data ? (data?.result.data as ITrack[]).map((album) => album._id) : []

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
      {listAlbumId && (
        <MusicProvider listAlbumId={listAlbumId} initIndexAlbum={0}>
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
