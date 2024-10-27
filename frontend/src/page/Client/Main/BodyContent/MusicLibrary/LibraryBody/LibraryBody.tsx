import Box from '@mui/material/Box'
import MusicView1 from '~/components/MusicView1'
import MusicView2 from '~/components/MusicView2'
import { IAlbum } from '~/type/Album/IAlbum'

type Props = {
  listAlbums: IAlbum[] | []
  album: number
}

export default function LibraryBody({ listAlbums, album }: Props) {
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
        {album !== 1 && <MusicView2 type='liked-music' totalMusic={6} />}
        {album !== 1 && <MusicView2 type='my-music' totalMusic={4} />}
        {listAlbums?.map((album, index) => <MusicView1 key={index} initAlbum={album} />)}
      </div>
    </Box>
  )
}
