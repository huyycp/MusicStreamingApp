import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useMusic } from '~/hooks/useMusic'
import { formatDuration } from '~/utils/formatDuration'

export default function MusicSlider() {
  const { position, setPosition, duration, audioElement } = useMusic()

  const handleSkip = (_: Event, newValue: number | number[]) => {
    if (audioElement) {
      audioElement.currentTime = newValue as number
      setPosition(newValue as number)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}
    >
      <Box>{formatDuration(position)}</Box>
      <Slider
        aria-label='time-indicator'
        size='small'
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={handleSkip}
        sx={{
          'color': (theme) => theme.palette.secondary4.main,
          'height': 4,
          'width': '100%',
          '&:hover': {
            color: (theme) => theme.palette.primary.main
          },
          '&:hover .MuiSlider-thumb': {
            opacity: 1
          },
          '& .MuiSlider-track': {
            '&:hover': {
              color: (theme) => theme.palette.primary.main
            }
          },
          '& .MuiSlider-thumb': {
            'opacity': 0,
            'width': 12,
            'height': 12,
            'transition': '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgb(0 0 0 / 16%)'
            },
            '&.Mui-active': {
              width: 20,
              height: 20
            }
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
            backgroundColor: (theme) => theme.palette.secondary4.main
          }
        }}
      />
      <Box>{formatDuration(duration)}</Box>
    </Box>
  )
}
