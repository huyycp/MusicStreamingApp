import Box from '@mui/material/Box'
import LibraryHeader from './LibraryHeader/LibraryHeader'
import LibraryBody from './LibraryBody/LibraryBody'

export default function MusicLibrary() {
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
      <LibraryHeader />
      <LibraryBody />
    </Box>
  )
}
