import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useRef, useState } from 'react'
import { ITrack } from '~/type/Tracks/ITrack'
import useGetMyLibrary from '~/hooks/Library/useGetMyLibrary'

export default function MainLayout() {
  const { data, isPending } = useGetMyLibrary(10, 1)
  const [listAlbumId, setListAlbumId] = useState<string[]>([])
  const [fullWidth, setFullWidth] = useState(window.innerWidth)
  const [albumIndex, setAlbumIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(0)

  // useRef lưu trữ albumIndex và trackIndex hiện tại để cập nhật nhanh chóng
  const albumIndexRef = useRef(0)
  const trackIndexRef = useRef(0)

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
      const firstAlbum = updatedList.shift()
      if (firstAlbum) updatedList.push(firstAlbum)
      return updatedList
    })

    // Cập nhật giá trị useRef ngay lập tức
    albumIndexRef.current = currentAlbumIndex
    trackIndexRef.current = currentTrackIndex

    // Sử dụng useState để kích hoạt re-render
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
