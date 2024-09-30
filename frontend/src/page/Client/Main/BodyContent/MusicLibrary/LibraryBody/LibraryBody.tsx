import Box from '@mui/material/Box'
import MusicView1 from '~/components/MusicView1'
import useGetTracks from '~/hooks/Tracks/useGetTracks'

export default function LibraryBody() {
  const { data } = useGetTracks()
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
        <MusicView1 type='liked-music' totalMusic={6} />
        <MusicView1 type='my-music' totalMusic={4} />
        {data?.result.data.map((music, index) => <MusicView1 key={index} initMusic={music} type='album' />)}
      </div>
    </Box>
  )
}
