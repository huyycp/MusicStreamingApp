import { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useResize } from '~/hooks/useResize'
import { Params, useParams } from 'react-router-dom'
import useGetTrackDetail from '~/hooks/Tracks/useGetTrackDetail'
import { ITrack } from '~/type/Tracks/ITrack'
import { formatDuration } from '~/utils/formatDuration'
import { getAudioDuration } from '~/utils/getAudioDuration'
import { CircularProgress, Tooltip } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import { useMusic } from '~/hooks/useMusic'

export default function TrackDetail() {
  const [isSticky, setIsSticky] = useState(false)
  const { trackId } = useParams<Params>()
  const { data, isPending } = useGetTrackDetail(trackId || null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { widths } = useResize()
  const [trackDurations, setTrackDurations] = useState<number>(0)
  const track = data?.result as ITrack
  const { addAlbum, music, pause, setPause } = useMusic()

  const handlePlay = () => {
    if (music?._id !== trackId) {
      addAlbum(track.album._id, 0, track._id)
    } else if (!pause) setPause(true)
    else setPause(false)
  }

  useEffect(() => {
    const fetchDurations = async () => {
      const duration = await getAudioDuration(track.path_audio)

      setTrackDurations(duration)
    }
    fetchDurations()
  }, [track])

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const triggerPosition = triggerRef.current.getBoundingClientRect().top
        setIsSticky(triggerPosition <= 0 + 60)
      }
    }

    const onScroll = () => {
      window.requestAnimationFrame(handleScroll)
    }

    window.addEventListener('wheel', onScroll)
    handleScroll()
    return () => window.removeEventListener('wheel', onScroll)
  }, [])

  if (isPending)
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <CircularProgress sx={{ color: (theme) => theme.palette.primary.main }} size={50} />
      </Box>
    )
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: 'calc(100% + 36px)',
          display: 'flex',
          flexDirection: 'column',
          height: '200px',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://live-production.wcms.abc-cdn.net.au/a362273509f7eccdcf362bb73b3b006d')
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
            <img
              alt={track?.name}
              src={track?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
              style={{
                inlineSize: '142px',
                blockSize: '142px',
                objectFit: 'cover'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto', mb: 'auto' }}>
              <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main }}>
                Bài hát
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 'calc(1vw + 1em)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {track?.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: (theme) => theme.palette.neutral.neutral1 }}>
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 1000 }}>
                  {track?.owners[0].name}
                </Typography>
                •
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 500 }}>
                  {track.name}
                </Typography>
                •
                <Typography variant='body2' sx={{ fontWeight: 1000 }}>
                  {track?.created_at.slice(0, 4)}
                </Typography>
                •
                <Typography variant='body2' sx={{ fontWeight: 1000 }}>
                  {formatDuration(trackDurations || 0)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box ref={triggerRef} sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'start', mb: 2 }}>
        {((track.album._id && track._id !== music?._id) || (track.album._id && track._id === music?._id && pause)) && (
          <IconButton onClick={handlePlay}>
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
          </IconButton>
        )}

        {track.album._id && track._id === music?._id && !pause && (
          <IconButton onClick={handlePlay}>
            <PauseCircleFilledIcon
              sx={{
                'color': (theme) => theme.palette.primary.main,
                'inlineSize': '65px',
                'blockSize': '65px',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          </IconButton>
        )}

        <Tooltip title='Thêm vào Bài hát yêu thích' placement='top'>
          <IconButton>
            <ControlPointIcon
              sx={{
                'color': (theme) => theme.palette.neutral.neutral1,
                'cursor': 'pointer',
                'fontSize': 36,
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Các tùy chọn khác cho ${track.name}`} placement='top'>
          <IconButton>
            <MoreHorizIcon
              sx={{
                'color': (theme) => theme.palette.neutral.neutral1,
                'inlineSize': '32px',
                'blockSize': '32px',
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
          </IconButton>
        </Tooltip>
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
          <IconButton>
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
          </IconButton>
          <Button variant='outlined' sx={{ p: '3px 15px', mr: '24px', ml: '16px', height: '32px' }}>
            Theo dõi
          </Button>
          <IconButton>
            <MoreHorizIcon
              sx={{
                'color': (theme) => theme.palette.neutral.neutral1,
                'inlineSize': '32px',
                'blockSize': '32px',
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
          </IconButton>
        </Box>
      )}
      <Box>
        <Typography variant='h6' fontWeight='bold'>
          Phổ biến
        </Typography>
      </Box>
    </Box>
  )
}
