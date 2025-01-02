import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { formatDuration } from '~/utils/formatDuration'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import Tooltip from '@mui/material/Tooltip'
import RepeatOnOutlinedIcon from '@mui/icons-material/RepeatOnOutlined'
import IconButton from '@mui/material/IconButton'
import { useMusic } from '~/hooks/useMusic'

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.78,
  fontWeight: 500,
  letterSpacing: 0.2
})

export default function MusicPlayer() {
  const { position, setPosition, duration, audioElement, playNextTrack, playPreviousTrack, pause, setPause, repeat, setRepeat } = useMusic()

  const handleSkip = (_: Event, newValue: number | number[]) => {
    if (audioElement) {
      audioElement.currentTime = newValue as number
      setPosition(newValue as number)
    }
  }

  return (
    <Box sx={{ width: '100%', height: '57px' }}>
      <Box
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'center',
          'gap': 1,
          '& .MuiIconButton-root': { padding: 'unset' },
          '& .MuiSvgIcon-root': {
            'cursor': 'pointer',
            '&:hover': { color: (theme) => theme.palette.secondary4.main }
          }
        }}
      >
        <Tooltip title='Bật trộn bài' placement='top'>
          <IconButton sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: (theme) => theme.palette.neutral.neutral1 } }}>
            <ShuffleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Trước' placement='top' onClick={playPreviousTrack}>
          <IconButton sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: (theme) => theme.palette.neutral.neutral1 } }}>
            <SkipPreviousIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={pause ? 'Phát' : 'Tạm dừng'} placement='top'>
          <IconButton
            onClick={() => setPause(!pause)}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 34, color: (theme) => theme.palette.secondary4.main } }}
          >
            {pause ? <PlayCircleFilledWhiteIcon /> : <PauseCircleFilledOutlinedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title='Tiếp' placement='top' onClick={playNextTrack}>
          <IconButton sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: (theme) => theme.palette.neutral.neutral1 } }}>
            <SkipNextIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={repeat ? 'Tắt chế độ lặp lại' : 'Kích hoạt chế độ lặp lại'} placement='top'>
          <IconButton onClick={() => setRepeat(!repeat)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}>
            {repeat ? (
              <RepeatOnOutlinedIcon sx={{ color: (theme) => theme.palette.primary.main }} />
            ) : (
              <RepeatOutlinedIcon sx={{ color: (theme) => theme.palette.neutral.neutral1 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <TinyText>{formatDuration(position)}</TinyText>
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
            'maxWidth': '508px',
            'width': '508px',
            'minWidth': '217px',
            '&:hover': { color: (theme) => theme.palette.primary.main },
            '&:hover .MuiSlider-thumb': { opacity: 1 },
            '& .MuiSlider-track': { '&:hover': { color: (theme) => theme.palette.primary.main } },
            '& .MuiSlider-thumb': {
              'opacity': 0,
              'width': 12,
              'height': 12,
              'transition': '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:hover, &.Mui-focusVisible': { boxShadow: '0px 0px 0px 8px rgb(0 0 0 / 16%)' },
              '&.Mui-active': { width: 20, height: 20 }
            },
            '& .MuiSlider-rail': { opacity: 0.28, backgroundColor: (theme) => theme.palette.secondary4.main }
          }}
        />
        <TinyText>{formatDuration(duration)}</TinyText>
      </Box>
    </Box>
  )
}
