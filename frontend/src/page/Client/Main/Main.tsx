import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import TrackBar from './TrackBar/TrackBar'
import BodyContent from './BodyContent/BodyContent'

export default function Main() {
  return (
    <Box
      sx={{
        minWidth: '784px'
      }}
    >
      <AppBar />
      <BodyContent />
      <TrackBar />
    </Box>
  )
}
