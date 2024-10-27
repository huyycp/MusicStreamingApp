import Box from '@mui/material/Box'
import LibraryHeader from './LibraryHeader/LibraryHeader'
import LibraryBody from './LibraryBody/LibraryBody'
import useGetAlbumByArtist from '~/hooks/Album/useGetAlbumByArtist'
import { IAlbum } from '~/type/Album/IAlbum'
import { useEffect, useState } from 'react'

export default function MusicLibrary() {
  const { data } = useGetAlbumByArtist(100, 1)
  const albums = data?.result.data as IAlbum[]
  const listAlbums = (albums ?? []).filter((album) => album.number_of_tracks > 0)
  const [playlistSelect, setPlaylistSelect] = useState<IAlbum[] | []>(listAlbums)
  const [album, setAlbum] = useState<number>(0)

  useEffect(() => {
    // Cập nhật playlistSelect chỉ khi listAlbums có dữ liệu
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
      <LibraryHeader listAlbums={listAlbums} setPlaylistSelect={setPlaylistSelect} setAlbum={setAlbum} album={album}/>
      <LibraryBody listAlbums={playlistSelect} album={album}/>
    </Box>
  )
}
