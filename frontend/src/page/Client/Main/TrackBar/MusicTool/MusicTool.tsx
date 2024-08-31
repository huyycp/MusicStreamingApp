import Box from '@mui/material/Box'
import ViewModeIcon from '~/assets/icon/ViewMode.svg?react'
import MicroIcon from '~/assets/icon/MicroIcon.svg?react'
import ListIcon from '~/assets/icon/ListIcon.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import Slider from '@mui/material/Slider'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import { useEffect, useState } from 'react'
import FullScreenView from '../FullScreenView/FullScreenView'
import { useMusic } from '~/hooks/useMusic'

type Props = {
  artistName: string[]
  musicName: string
  musicImage: string
}

export default function MusicTool({ artistName, musicName, musicImage }: Props) {
  const { mute, setMute, volume, setVolume } = useMusic()
  const [fullScreen, setFullScreen] = useState(false)

  const handleVolume = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setVolume(newValue / 100)
      setMute(newValue === 0)
    }
  }
  useEffect(() => {
    if (fullScreen) {
      document.documentElement.requestFullscreen()
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }, [fullScreen])
  return (
    <Box>
      <Box
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'gap': 2,
          '& .MuiSvgIcon-root': {
            'color': (theme) => theme.palette.neutral.neutral1,
            'cursor': 'pointer',
            'fontSize': 16,
            '&:hover': {
              color: (theme) => theme.palette.secondary4.main
            }
          }
        }}
      >
        <Tooltip title='Chế độ xem Đang phát' placement='top'>
          <Box>
            <SvgIcon component={ViewModeIcon} inheritViewBox />
          </Box>
        </Tooltip>
        <Tooltip title='Lời bài hát' placement='top'>
          <Box>
            <SvgIcon component={MicroIcon} inheritViewBox />
          </Box>
        </Tooltip>
        <Tooltip title='Danh sách chờ' placement='top'>
          <Box>
            <SvgIcon component={ListIcon} inheritViewBox />
          </Box>
        </Tooltip>
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
        <Tooltip title='Toàn màn hình' placement='top'>
          <Box onClick={() => setFullScreen(true)}>
            <SvgIcon component={OpenInFullIcon} inheritViewBox />
          </Box>
        </Tooltip>
      </Box>
      {fullScreen && (
        <FullScreenView
          setFullScreen={setFullScreen}
          artistName={artistName}
          musicImage={musicImage}
          musicName={musicName}
        />
      )}
    </Box>
  )
}
