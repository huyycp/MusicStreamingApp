import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import RepeatOnOutlinedIcon from '@mui/icons-material/RepeatOnOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import Slider from '@mui/material/Slider'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import MusicSlider from './MusicSlider/MusicSlider'
import { useMusic } from '~/hooks/useMusic'

type Props = {
  // eslint-disable-next-line no-unused-vars
  setFullScreen: (value: React.SetStateAction<boolean>) => void
}

export default function Footer({ setFullScreen }: Props) {
  const { pause, setPause, repeat, setRepeat, mute, setMute, playNextTrack, playPreviousTrack, volume, setVolume } = useMusic()

  const handleVolume = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setVolume(newValue / 100)
      setMute(newValue === 0)
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '112px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <MusicSlider />
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '89px', alignItems: 'center', flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            padding: '12px 0px'
          }}
        >
          <ControlPointIcon
            sx={{
              'color': (theme) => theme.palette.neutral.neutral1,
              'cursor': 'pointer',
              'fontSize': 24,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              'gap': 2,
              '& .MuiIconButton-root': {
                padding: 'unset'
              },
              '& .MuiSvgIcon-root': {
                'cursor': 'pointer',
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }
            }}
          >
            <Tooltip title='Bật trộn bài' placement='top'>
              <IconButton
                sx={{
                  'padding': '8px',
                  'fontSize': 32,
                  '& .MuiSvgIcon-root': {
                    color: (theme) => theme.palette.neutral.neutral1
                  }
                }}
              >
                <ShuffleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Trước' placement='top' onClick={playPreviousTrack}>
              <IconButton
                sx={{
                  'padding': '8px',
                  'fontSize': 32,
                  '& .MuiSvgIcon-root': {
                    color: (theme) => theme.palette.neutral.neutral1
                  }
                }}
              >
                <SkipPreviousIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={pause ? 'Phát' : 'Tạm dừng'} placement='top'>
              <IconButton
                onClick={() => setPause(!pause)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 56,
                    color: (theme) => theme.palette.secondary4.main
                  }
                }}
              >
                {pause === false ? <PauseCircleFilledOutlinedIcon /> : <PlayCircleFilledWhiteIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title='Tiếp' placement='top' onClick={playNextTrack}>
              <IconButton
                sx={{
                  'padding': '8px',
                  'fontSize': 32,
                  '& .MuiSvgIcon-root': {
                    color: (theme) => theme.palette.neutral.neutral1
                  }
                }}
              >
                <SkipNextIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={repeat ? 'Tắt chế độ lặp lại' : 'Kích hoạt chế độ lặp lại'} placement='top'>
              <IconButton
                onClick={() => setRepeat(!repeat)}
                sx={{
                  padding: '8px',
                  fontSize: 32
                }}
              >
                {repeat === false ? (
                  <RepeatOutlinedIcon sx={{ color: (theme) => theme.palette.neutral.neutral1 }} />
                ) : (
                  <RepeatOnOutlinedIcon sx={{ color: (theme) => theme.palette.primary.main }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              'display': 'flex',
              'alignItems': 'center',
              'gap': 2,
              '& .MuiSvgIcon-root': {
                'color': (theme) => theme.palette.neutral.neutral1,
                'cursor': 'pointer',
                'fontSize': 24,
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }
            }}
          >
            <Tooltip title='Tắt tiếng' placement='top'>
              <Box>
                {mute ? (
                  <SvgIcon component={VolumeOffIcon} inheritViewBox onClick={() => setMute(false)} />
                ) : volume <= 0.5 ? (
                  <SvgIcon component={VolumeDownRounded} inheritViewBox onClick={() => setMute(true)} />
                ) : (
                  <SvgIcon component={VolumeUpRounded} inheritViewBox onClick={() => setMute(true)} />
                )}
              </Box>
            </Tooltip>
            <Box>
              <Slider
                aria-label='Volume'
                value={mute ? 0 : volume * 100}
                onChange={handleVolume}
                sx={{
                  'color': (theme) => theme.palette.secondary4.main,
                  'height': 4,
                  'maxWidth': '93px',
                  'width': '93px',
                  'minWidth': '41px',
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
            </Box>
            <Tooltip title='Thoát toàn màn hình' placement='top'>
              <Box onClick={() => setFullScreen(false)}>
                <SvgIcon component={CloseFullscreenIcon} inheritViewBox />
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
