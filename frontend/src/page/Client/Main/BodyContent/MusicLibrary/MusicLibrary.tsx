import Box from '@mui/material/Box'
import LibraryHeader from './LibraryHeader/LibraryHeader'
import LibraryBody from './LibraryBody/LibraryBody'
import { useEffect, useState } from 'react'
import { ILibrary } from '~/type/Library/ILibrary'
import useGetMyLibrary from '~/hooks/Library/useGetMyLibrary'

export default function MusicLibrary() {
  const { data } = useGetMyLibrary(100, 1)
  const albums = data?.result.data as ILibrary[]
  const listAlbums = (albums ?? []).filter((album) => album.number_of_tracks > 0 && album.type === 'album' || album.type === 'playlist')
  const [playlistSelect, setPlaylistSelect] = useState<ILibrary[] | []>(listAlbums)
  const [album, setAlbum] = useState<number>(0)

  useEffect(() => {
    if (listAlbums.length > 0 && playlistSelect.length === 0) {
      setPlaylistSelect(listAlbums)
    }
  }, [listAlbums, playlistSelect.length])

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
      <LibraryHeader listAlbums={listAlbums} setPlaylistSelect={setPlaylistSelect} setAlbum={setAlbum} album={album} />
      <LibraryBody listAlbums={playlistSelect} album={album} />
    </Box>
  )
}
