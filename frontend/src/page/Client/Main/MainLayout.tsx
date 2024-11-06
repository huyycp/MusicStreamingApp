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
  const { data, isPending } = useGetAlbums(3, 1)
  const [listAlbumId, setListAlbumId] = useState<string[]>([])
  const [fullWidth, setFullWidth] = useState(window.innerWidth)
  const [albumIndex, setAlbumIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(0)

  useEffect(() => {
    if (data && data.result && data.result.data) {
      const initialAlbumIds = (data.result.data as ITrack[]).map((album) => album._id)
      setListAlbumId(initialAlbumIds)
    }
  }, [data])

  const addAlbumToList = (albumId: string, currentAlbumIndex: number, currentTrackIndex: number) => {
    setListAlbumId((prevList) => {
      const updatedList = [...prevList]
      updatedList.splice(currentAlbumIndex, 0, albumId)

      return updatedList
    })
    setAlbumIndex(currentAlbumIndex)
    setTrackIndex(currentTrackIndex)
  }

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
        <MusicProvider listAlbumId={listAlbumId} initIndexAlbum={albumIndex} addAlbumToList={addAlbumToList} trackIndex={trackIndex}>
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
