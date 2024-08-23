import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import MusicIcon from '~/assets/icon/MusicIcon.svg?react'
import MusicPlayerSlider from '~/components/MusicPlayerSlider/MusicPlayerSlider'

export default function Main() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100vw',
        minHeight: '100vh'
      }}
    >
      <SvgIcon component={MusicIcon} inheritViewBox sx={{ fontSize: 100 }} />
      <MusicPlayerSlider defaultVolume={0.5} />
    </Box>
  )
}
