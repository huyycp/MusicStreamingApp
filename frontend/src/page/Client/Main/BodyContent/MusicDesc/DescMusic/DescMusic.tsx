import Box from '@mui/material/Box'
import DescTitle from './DescTitle/DescTitle'
import DescBody from './DescBody/DescBody'
import DescArtist from './DescArtist/DescArtist'
import DescNext from './DescNext/DescNext'
import { useMusic } from '~/hooks/useMusic'

export default function DescMusic() {
  const { nextMusic } = useMusic()

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1
        }}
      >
        <DescTitle />
      </Box>
      <Box>
        <DescBody />
        <DescArtist />
        {nextMusic && <DescNext nextMusic={nextMusic} />}
      </Box>
    </Box>
  )
}
