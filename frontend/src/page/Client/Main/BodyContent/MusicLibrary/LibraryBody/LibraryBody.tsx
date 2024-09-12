import Box from '@mui/material/Box'
import { mockData } from '~/apis/data-mock'
import MusicView1 from '~/components/MusicView1'

export default function LibraryBody() {
  const data = mockData
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
      <div className='scrollable-container' style={{ height: '100%', overflow: 'auto' }}>
        <Box sx={{ width: '100%', height: '5px' }}></Box>
        <MusicView1 collection={true} totalMusic={6} />
        {data.listMusics.map((music, index) => (
          <MusicView1 key={index} initMusic={music} />
        ))}
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
        <MusicView1 collection={true} totalMusic={6} />
      </div>
    </Box>
  )
}
