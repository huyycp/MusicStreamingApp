import Box from '@mui/material/Box'
import { useMusic } from '~/hooks/useMusic'
import { useResize } from '~/hooks/useResize'

export default function MusicDesc() {
  const { openList, openMusic } = useResize()
  const { music } = useMusic()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.secondary2.main,
        color: (theme) => theme.palette.secondary4.main,
        borderRadius: '10px'
      }}
    >
      {openList && <Box>ListMusic</Box>}
      {openMusic && <Box>{music.name}</Box>}
    </Box>
  )
}
