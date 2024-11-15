import Box from '@mui/material/Box'
import DescMusic from './DescMusic/DescMusic'

export default function MusicDesc() {
  return (
    <Box
      sx={{
        inlineSize: '100%',
        blockSize: '100%',
        maxBlockSize: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.secondary2.main,
        color: (theme) => theme.palette.secondary4.main,
        borderRadius: '10px'
      }}
    >
      {/* {openList && <Box>ListMusic</Box>} */}
      <DescMusic />
    </Box>
  )
}
