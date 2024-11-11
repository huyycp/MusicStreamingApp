import Box from '@mui/material/Box'
import MusicView1 from '~/components/MusicView1'
import MusicView2 from '~/components/MusicView2'
import { useUser } from '~/hooks/useUser'
import { ILibrary } from '~/type/Library/ILibrary'

type Props = {
  listAlbums: ILibrary[] | []
  album: number
}

export default function LibraryBody({ listAlbums, album }: Props) {
  const { user } = useUser()
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
        {album !== 1 && user && <MusicView2 type='liked-music' totalMusic={6} />}
        {album !== 1 && user?.role === 1 && <MusicView2 type='my-music' totalMusic={4} />}
        {listAlbums?.map((album, index) => <MusicView1 key={index} initAlbum={album} />)}
      </div>
    </Box>
  )
}
