import Box from '@mui/material/Box'
import MusicView1 from '~/components/MusicView1'
import MusicView2 from '~/components/MusicView2'
import useGetAlbumByArtist from '~/hooks/Album/useGetAlbumByArtist'
import { IAlbum } from '~/type/Album/IAlbum'

export default function LibraryBody() {
  const { data } = useGetAlbumByArtist(100, 1)
  const albums = data?.result.data as IAlbum[]
  const listAlbums = (albums ?? []).filter((album) => album.number_of_tracks > 0)
  return (
    <Box
      sx={{
        display: 'flex-1',
        alignItems: 'center',
        gap: 1,
        padding: '0px 0px 0px 12px',
        overflowY: 'hidden'
      }}
    >
      <div className='scrollable-container' style={{ blockSize: '100%', overflow: 'auto' }}>
        <Box sx={{ inlineSize: '100%', blockSize: '5px' }}></Box>
        <MusicView2 type='liked-music' totalMusic={6} />
        <MusicView2 type='my-music' totalMusic={4} />
        {listAlbums?.map((album, index) => <MusicView1 key={index} initAlbum={album} />)}
      </div>
    </Box>
  )
}
