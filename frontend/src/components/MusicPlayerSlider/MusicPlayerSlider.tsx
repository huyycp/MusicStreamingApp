import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import { fetchSongData } from '~/apis/testApi'
import { useEffect, useState } from 'react'

const WallPaper = styled('div')({
  'position': 'absolute',
  'width': '100%',
  'height': '100%',
  'top': 0,
  'left': 0,
  'overflow': 'hidden',
  'background': 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  'transition': 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&::before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)'
  },
  '&::after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)'
  }
})

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)'
}))

const CoverImage = styled('div')({
  'width': 100,
  'height': 100,
  'objectFit': 'cover',
  'overflow': 'hidden',
  'flexShrink': 0,
  'borderRadius': 8,
  'backgroundColor': 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%'
  }
})

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2
})

interface MusicPlayerSliderProps {
  defaultVolume: number
}

export default function MusicPlayerSlider({
  defaultVolume
}: MusicPlayerSliderProps) {
  const theme = useTheme()
  const [position, setPosition] = useState(0)
  const [volume, setVolume] = useState(defaultVolume)
  const [paused, setPaused] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [songData, setSongData] = useState<null | any>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  )
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetchSongData() // Replace with actual song ID if needed
        setSongData(response.data[0]) // Assuming response.data is an array and you need the first item
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch song data', error)
      }
    }

    fetchSong()
  }, [])

  useEffect(() => {
    if (songData) {
      const audio = new Audio(songData.attributes.previews[0].url) // Ensure this URL is correct
      audio.volume = defaultVolume
      setAudioElement(audio)

      // Update duration once the audio metadata is loaded
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })

      // Update position as the audio plays
      const updatePosition = () => {
        setPosition(audio.currentTime)
      }

      audio.addEventListener('timeupdate', updatePosition)

      // Clean up event listeners on component unmount
      return () => {
        audio.removeEventListener('timeupdate', updatePosition)
        audio.pause()
      }
    }
  }, [defaultVolume, songData])

  useEffect(() => {
    if (audioElement) {
      if (paused) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
    }
  }, [paused, audioElement])

  const handlePause = (_: Event, newValue: number | number[]) => {
    if (audioElement) {
      audioElement.currentTime = newValue as number
      setPosition(newValue as number)
    }
  }

  const handleVolume = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      const volumeValue = newValue / 100
      if (audioElement) {
        audioElement.volume = volumeValue
      }
      setVolume(newValue / 100)
    }
  }

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = Math.round(value % 60) // Làm tròn số giây
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        {songData ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CoverImage>
                <img
                  alt={songData.attributes.name}
                  src={songData.attributes.artwork.url.replace(
                    '{w}x{h}bb',
                    '100x100bb'
                  )}
                />
              </CoverImage>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  fontWeight={500}
                >
                  {songData.attributes.artistName}
                </Typography>
                <Typography noWrap>
                  <b>{songData.attributes.name}</b>
                </Typography>
                <Typography noWrap letterSpacing={-0.25}>
                  {songData.attributes.albumName}
                </Typography>
              </Box>
            </Box>
            <Slider
              aria-label='time-indicator'
              size='small'
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={handlePause}
              sx={{
                'color':
                  theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                'height': 4,
                '& .MuiSlider-thumb': {
                  'width': 8,
                  'height': 8,
                  'transition': '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&::before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)'
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                    }`
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20
                  }
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2
              }}
            >
              <TinyText>{formatDuration(position)}</TinyText>
              <TinyText>{formatDuration(duration - position)}</TinyText>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: -1
              }}
            >
              <IconButton aria-label='previous song'>
                <FastRewindRounded fontSize='large' htmlColor={mainIconColor} />
              </IconButton>
              <IconButton
                aria-label={paused ? 'play' : 'pause'}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <PlayArrowRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                ) : (
                  <PauseRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                )}
              </IconButton>
              <IconButton aria-label='next song'>
                <FastForwardRounded
                  fontSize='large'
                  htmlColor={mainIconColor}
                />
              </IconButton>
            </Box>
            <Stack
              spacing={2}
              direction='row'
              sx={{ mb: 1, px: 1 }}
              alignItems='center'
            >
              <VolumeOffIcon htmlColor={lightIconColor} />
              <Slider
                aria-label='Volume'
                value={volume * 100}
                onChange={handleVolume}
                sx={{
                  'color':
                    theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  '& .MuiSlider-track': {
                    border: 'none'
                  },
                  '& .MuiSlider-thumb': {
                    'width': 24,
                    'height': 24,
                    'backgroundColor': '#fff',
                    '&::before': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: 'none'
                    }
                  }
                }}
              />
              {volume >= 0.5 && <VolumeUpRounded htmlColor={lightIconColor} />}
              {volume < 0.5 && <VolumeDownRounded htmlColor={lightIconColor} />}
            </Stack>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Widget>
      <WallPaper />
    </Box>
  )
}
