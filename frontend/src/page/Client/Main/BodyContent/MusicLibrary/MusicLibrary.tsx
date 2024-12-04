import Box from '@mui/material/Box'
import LibraryHeader from './LibraryHeader/LibraryHeader'
import LibraryBody from './LibraryBody/LibraryBody'
import { useEffect, useState } from 'react'
import { ILibrary } from '~/type/Library/ILibrary'
import useGetMyLibrary from '~/hooks/Library/useGetMyLibrary'
import { useUser } from '~/hooks/useUser'
import LibraryHeaderNoUser from './LibraryHeader/LibraryHeaderNoUser'

export default function MusicLibrary() {
  const { user } = useUser()
  const { data } = useGetMyLibrary(100, 1)
  const [playlistSelect, setPlaylistSelect] = useState<ILibrary[] | []>([])
  const [originalPlaylist, setOriginalPlaylist] = useState<ILibrary[] | []>([])
  const [album, setAlbum] = useState<number>(0)

  useEffect(() => {
    if (data) {
      const listAlbums = (data?.result.data as ILibrary[]).filter(
        (album) => (album.number_of_tracks > 0 && album.type === 'album') || album.type === 'playlist'
      )

      setPlaylistSelect(listAlbums)
      setOriginalPlaylist(listAlbums)
    }
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        bgcolor: (theme) => theme.palette.secondary2.main,
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {user && (
        <LibraryHeader
          listAlbums={playlistSelect}
          setPlaylistSelect={setPlaylistSelect}
          setAlbum={setAlbum}
          album={album}
          originalPlaylist={originalPlaylist}
        />
      )}
      {user && <LibraryBody listAlbums={playlistSelect} album={album} />}
      {!user && <LibraryHeaderNoUser />}
    </Box>
  )
}
