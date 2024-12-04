import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ITrack } from '~/type/Tracks/ITrack'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import { formatDuration } from '~/utils/formatDuration'
import { getAudioDuration } from '~/utils/getAudioDuration'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import { useMusic } from '~/hooks/useMusic'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import MenuTrack from '~/components/MenuMore/MenuTrack'
import Tooltip from '@mui/material/Tooltip'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

type Props = {
  tracks: ITrack[]
}

export default function SearchResults({ tracks }: Props) {
  const navigate = useNavigate()
  const [trackDurations, setTrackDurations] = useState<{ [key: string]: number }>({})
  const { pause, setPause, music, addTrackList } = useMusic()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>, track: ITrack) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setSelectedTrack(track)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTrack(null)
  }

  useEffect(() => {
    const fetchDurations = async () => {
      const durations: { [key: string]: number } = {}
      for (const track of tracks) {
        const duration = await getAudioDuration(track.path_audio)
        durations[track._id] = duration
      }
      setTrackDurations(durations)
    }
    fetchDurations()
  }, [tracks])

  return (
    <Box sx={{ width: '100%', p: 1, bgcolor: 'inherit' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mb: 1, alignItems: 'stretch' }}>
        <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant='h6' sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Kết quả hàng đầu
          </Typography>

          <Box
            sx={{
              'position': 'relative',
              'width': '100%',
              'height': '100%',
              'bgcolor': (theme) => theme.palette.neutral.neutral3,
              'p': '20px',
              'borderRadius': '10px',
              'cursor': 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              },
              '&:hover .play-icon': {
                opacity: 1,
                visibility: 'visible'
              }
            }}
          >
            <Box sx={{ mb: 2 }}>
              <img
                alt={tracks[0].name}
                src={tracks[0]?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
                onError={(e) => {
                  e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
                }}
                style={{
                  width: 92,
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            </Box>

            <Typography
              variant='h4'
              sx={{
                'color': 'white',
                'fontWeight': 'bold',
                'mb': 0.5,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              onClick={() => navigate(`/track/${tracks[0]._id}`)}
            >
              {capitalizeFirstLetterOfEachWord(tracks[0].name)}
            </Typography>

            <Typography
              variant='body2'
              sx={{
                color: (theme) => theme.palette.neutral.neutral1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <span>Bài hát</span>
              <span>•</span>
              <Typography
                sx={{
                  fontSize: 14,
                  color: (theme) => theme.palette.neutral.neutral1,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 0.5
                }}
              >
                {tracks[0].owners?.map((artist, index) => (
                  <Box
                    key={artist._id}
                    onClick={() => navigate(`/artist/${artist._id}`)}
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {artist.name}
                    {index < (tracks[0].owners?.length ?? 0) - 1 && ','}
                  </Box>
                ))}
              </Typography>
            </Typography>
            <Box
              className='play-icon'
              sx={{
                'position': 'absolute',
                'bottom': '10%',
                'right': '10%',
                'opacity': 0,
                'visibility': 'hidden',
                'transition': 'opacity 0.3s, visibility 0.3s',
                '& svg': {
                  'color': (theme) => theme.palette.primary.main,
                  'fontSize': 50,
                  'p': 'unset',
                  'cursor': 'pointer',
                  'borderRadius': '100%',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }
              }}
              onClick={() => {
                if (music?._id === tracks[0]._id) {
                  setPause(!pause)
                } else addTrackList([tracks[0]])
              }}
            >
              {music?._id === tracks[0]._id ? pause === true ? <PlayCircleIcon /> : <PauseCircleIcon /> : <PlayCircleIcon />}
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '55%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant='h6' sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Bài hát
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {tracks?.map((track, index) => (
              <Box
                key={index}
                sx={{
                  'display': 'flex',
                  'alignItems': 'center',
                  'gap': 2,
                  'p': 1,
                  'borderRadius': 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  },
                  '&:hover .more-icon': {
                    opacity: 1,
                    visibility: 'visible'
                  },
                  '&:hover .play-icon-2': {
                    opacity: 1,
                    visibility: 'visible'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => {
                    if (music?._id === track._id) {
                      setPause(!pause)
                    } else addTrackList([track])
                  }}
                >
                  <img
                    alt={track.name}
                    src={track?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <IconButton
                    className='play-icon-2'
                    sx={{
                      opacity: 0,
                      position: 'absolute',
                      insetBlockStart: '-10%',
                      insetInlineStart: '-10%'
                    }}
                  >
                    {music?._id === track._id ? (
                      pause === true ? (
                        <PlayArrowIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 30 }} />
                      ) : (
                        <PauseIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 30 }} />
                      )
                    ) : (
                      <PlayArrowIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 30 }} />
                    )}
                  </IconButton>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      'color': music?._id === track._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.secondary4.main,
                      'fontSize': '0.9rem',
                      'mb': 0.5,
                      'cursor': 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => navigate(`/track/${track._id}`)}
                  >
                    {track.name}
                  </Typography>

                  <Typography
                    sx={{
                      'fontSize': 14,
                      'color': (theme) => theme.palette.neutral.neutral1,
                      'display': 'flex',
                      'flexDirection': 'row',
                      'gap': 0.5,
                      'cursor': 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {track.owners?.map((artist, index) => (
                      <Box
                        key={artist._id}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/artist/${artist._id}`)
                        }}
                        sx={{
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {artist.name}
                        {index < (track.owners?.length ?? 0) - 1 && ','}
                      </Box>
                    ))}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: (theme) => theme.palette.neutral.neutral1,
                    fontSize: '0.8rem'
                  }}
                >
                  {formatDuration(trackDurations[track._id] || 0)}
                </Typography>
                <Tooltip title='Khác' placement='top' onClick={(e) => handleClick(e, track)} className='more-icon'>
                  <IconButton
                    sx={{
                      'opacity': 0,
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.neutral.neutral2
                      }
                    }}
                  >
                    <MoreHorizIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
                  </IconButton>
                </Tooltip>
                {selectedTrack && anchorEl && <MenuTrack open={Boolean(anchorEl)} anchorEl={anchorEl} track={selectedTrack} onClose={handleClose} />}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
