import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useEffect, useRef, useState } from 'react'
import { useResize } from '~/hooks/useResize'
import { useMusic } from '~/hooks/useMusic'
import { useNavigate } from 'react-router-dom'
import { ITrack } from '~/type/Tracks/ITrack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useUser } from '~/hooks/useUser'
import Loader from '../Animation/Loader'
import MenuTrack from '../MenuMore/MenuTrack'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { formatDuration } from '~/utils/formatDuration'
import { getAudioDuration } from '~/utils/getAudioDuration'
import { useFavorite } from '~/hooks/useFavorite'

export default function LikedMusic() {
  const { setPause, addTrackList, album, pause, music, addAlbum } = useMusic()
  const [trackDurations, setTrackDurations] = useState<{ [key: string]: number }>({})
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null)
  const navigate = useNavigate()
  const { user } = useUser()
  const [isSticky, setIsSticky] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { favTracks: listTracks, favIds } = useFavorite()
  const { widths } = useResize()

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const triggerPosition = triggerRef.current.getBoundingClientRect().top
        setIsSticky(triggerPosition <= 0)
      }
    }

    const onScroll = () => {
      window.requestAnimationFrame(handleScroll)
    }

    window.addEventListener('wheel', onScroll)
    handleScroll()
    return () => window.removeEventListener('wheel', onScroll)
  }, [])

  const handlePlayAll = () => {
    if (album._id === favIds) {
      setPause(!pause)
    } else if (listTracks.length !== 0) {
      if (favIds) {
        addAlbum(favIds, 0)
      }
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTrack(null)
  }

  const handlePlayOnce = (musicData: ITrack) => {
    if (musicData._id === music?._id) {
      if (!pause) setPause(true)
      else setPause(false)
    } else {
      addTrackList([musicData])
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>, track: ITrack) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setSelectedTrack(track)
  }

  useEffect(() => {
    if (!listTracks?.length) return

    const fetchDurations = async () => {
      const newDurations: { [key: string]: number } = {}
      const promises = listTracks
        .filter((track) => !trackDurations[track._id])
        .map(async (track) => {
          const duration = await getAudioDuration(track.path_audio)
          newDurations[track._id] = duration
        })

      await Promise.all(promises)
      setTrackDurations((prev) => ({ ...prev, ...newDurations }))
    }

    fetchDurations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTracks])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          width: 'calc(100% + 36px)',
          display: 'flex',
          flexDirection: 'column',
          height: '200px',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://res.cloudinary.com/dswj1rtvu/image/upload/v1733478512/27f3bf83-df1b-4428-b788-0645992626a2_fm7pte.webp')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginLeft: '-18px',
          marginRight: '-18px'
        }}
      >
        <Box sx={{ pl: '18px', pr: '18px' }}>
          <Box sx={{ height: '50px' }}></Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '142px',
                height: '142px',
                background: (theme) => theme.palette.gradient.gradient3,
                borderRadius: '5px'
              }}
            >
              <FavoriteIcon sx={{ fontSize: '60px' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto', mb: 'auto' }}>
              <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main }}>
                Danh sách phát
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  color: 'white',
                  fontWeight: '1000',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Bài hát đã thích
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: (theme) => theme.palette.neutral.neutral1 }}>
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 1000 }}>
                  {user?.name}
                </Typography>
                •
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {listTracks?.length || 0} bài hát
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ref={triggerRef} sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'start' }}>
        <IconButton onClick={() => handlePlayAll()}>
          {favIds === album?._id && !pause ? (
            <PauseCircleFilledRoundedIcon
              sx={{
                'color': (theme) => theme.palette.primary.main,
                'inlineSize': '65px',
                'blockSize': '65px',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          ) : (
            <PlayCircleFilledOutlinedIcon
              sx={{
                'color': (theme) => theme.palette.primary.main,
                'inlineSize': '65px',
                'blockSize': '65px',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          )}
        </IconButton>
      </Box>

      {isSticky && (
        <Box
          sx={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'row',
            bgcolor: (theme) => theme.palette.secondary2.main,
            width: `calc(${widths[1]}px - 36px)`,
            alignItems: 'center',
            justifyContent: 'start',
            ml: '-18px',
            pl: '18px',
            zIndex: 1100
          }}
        >
          <IconButton onClick={() => handlePlayAll()}>
            {favIds === album?._id && !pause ? (
              <PauseCircleFilledRoundedIcon
                sx={{
                  'color': (theme) => theme.palette.primary.main,
                  'inlineSize': '65px',
                  'blockSize': '65px',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            ) : (
              <PlayCircleFilledOutlinedIcon
                sx={{
                  'color': (theme) => theme.palette.primary.main,
                  'inlineSize': '65px',
                  'blockSize': '65px',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            )}
          </IconButton>
          <Typography
            sx={{
              color: 'white',
              fontWeight: '1000',
              fontSize: 'calc(1vw + 1em)'
            }}
          >
            Bài hát đã thích
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          bgcolor: 'inherit',
          borderBottom: '1px solid #27272a'
        }}
      >
        <Typography
          sx={{
            minWidth: 40,
            fontSize: 12,
            pl: 1,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          #
        </Typography>
        <Typography
          sx={{
            flex: 1,
            fontSize: 12,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          Tiêu đề
        </Typography>
        <Typography
          sx={{
            width: 150,
            fontSize: 12,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          Album
        </Typography>
        <Typography
          sx={{
            width: 100,
            fontSize: 12,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          Thể loại
        </Typography>
        <AccessTimeIcon fontSize='small' sx={{ color: (theme) => theme.palette.neutral.neutral1, mr: 4 }} />
      </Box>
      {listTracks?.map((track, index) => (
        <Box
          key={index}
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'px': 1,
            'py': 1,
            'bgcolor': 'inherit',
            'cursor': 'pointer',
            'borderRadius': '5px',
            '&:hover': {
              'bgcolor': (theme) => theme.palette.neutral.neutral3,
              '& .MuiIconButton-root': { opacity: 1 }
            }
          }}
        >
          {anchorEl && selectedTrack && <MenuTrack track={selectedTrack} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} />}
          {music?._id === track._id && !pause ? (
            <Box
              sx={{ width: '40px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => handlePlayOnce(track)}
            >
              <Loader width='70%' height='60%' barWidth='4px' maxBarHeight='35px' />
            </Box>
          ) : (
            <Typography
              sx={{
                minWidth: 40,
                fontSize: 16,
                pl: 1.5,
                color: track._id === music?._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.neutral.neutral1
              }}
              onClick={() => handlePlayOnce(track)}
            >
              {index + 1}
            </Typography>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
            onClick={() => handlePlayOnce(track)}
          >
            <img
              alt={track?.name}
              src={
                track?.image?.replace('{w}x{h}bb', '48x48bb') || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
              }
              onError={(e) => {
                e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
              }}
              style={{
                inlineSize: '40px',
                blockSize: '40px',
                objectFit: 'cover',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                sx={{
                  'fontSize': 14,
                  'color': music?._id === track._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.secondary4.main,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate(`/track/${track._id}`)}
              >
                {capitalizeFirstLetterOfEachWord(track.name)}
              </Typography>
              <Typography
                component='div'
                sx={{
                  fontSize: 14,
                  color: (theme) => theme.palette.neutral.neutral1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5
                }}
              >
                {track.owners?.map((artist, index) => (
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
                    {index < (track.owners?.length ?? 0) - 1 && ','}
                  </Box>
                ))}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              'width': 200,
              'fontSize': 14,
              'color': (theme) => theme.palette.neutral.neutral1,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={() => navigate(`/library/${track.album?._id}`)}
          >
            {track.album?.name}
          </Typography>
          <Typography
            sx={{
              'width': 40,
              'fontSize': 14,
              'color': (theme) => theme.palette.neutral.neutral1,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={() => navigate(`/genres/${track.genre?._id}`)}
          >
            {track.genre?.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Tooltip title='Thêm vào Bài hát yêu thích' placement='top'>
              <IconButton
                sx={{
                  'opacity': 0,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <CheckCircleIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                fontSize: 14,
                color: (theme) => theme.palette.neutral.neutral1
              }}
            >
              {formatDuration(trackDurations[track._id] || 0)}
            </Typography>
            <Tooltip
              title='Khác'
              placement='top'
              onClick={(e) => {
                handleClick(e, track)
              }}
            >
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
          </Box>
        </Box>
      ))}
    </Box>
  )
}
