import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import { ResizeProvider } from '~/contents/ResizeProvider'
import { MusicProvider } from '~/contents/MusicProvider'
import { useEffect, useRef, useState } from 'react'
import useGetMyLibrary from '~/hooks/Library/useGetMyLibrary'
import { ILibrary } from '~/type/Library/ILibrary'

export default function MainLayout() {
  const { data, isPending } = useGetMyLibrary(100, 1)
  const [listAlbumId, setListAlbumId] = useState<string[]>([])
  const [fullWidth, setFullWidth] = useState(window.innerWidth)
  const [albumIndex, setAlbumIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(0)
  let trackId = ''

  const albumIndexRef = useRef(0)
  const trackIndexRef = useRef(0)

  useEffect(() => {
    if (data && data.result && data.result.data) {
      const listAlbums = (data.result.data as ILibrary[]).filter((album) => album.number_of_tracks > 0)
      const initialAlbumIds = listAlbums.map((album) => album._id)
      setListAlbumId(initialAlbumIds)
    }
  }, [data])

  const addAlbumToList = (albumId: string, currentAlbumIndex: number, currentTrackIndex: number, initTrackId?: string) => {
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
    if (trackId) trackId = initTrackId || ''
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
      {!isPending && listAlbumId && (
        <MusicProvider
          listAlbumId={listAlbumId}
          initIndexAlbum={albumIndex}
          addAlbumToList={addAlbumToList}
          trackIndex={trackIndex}
          initTrackId={trackId}
        >
          <ResizeProvider fullWidth={fullWidth}>
            <Outlet />
            <TrackBar />
          </ResizeProvider>
        </MusicProvider>
      )}
      {isPending && (
        <MusicProvider
          listAlbumId={listAlbumId}
          initIndexAlbum={albumIndex}
          addAlbumToList={addAlbumToList}
          trackIndex={trackIndex}
          initTrackId={trackId}
        >
          <ResizeProvider fullWidth={fullWidth}>
            <Outlet />
            <TrackBar />
          </ResizeProvider>
        </MusicProvider>
      )}
    </Box>
  )
}
