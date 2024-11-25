import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import { ITrack } from '~/type/Tracks/ITrack'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import MenuTrack from '~/components/MenuMore/MenuTrack'
import { useEffect, useState } from 'react'
import { useMusic } from '~/hooks/useMusic'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { getAudioDuration } from '~/utils/getAudioDuration'
import { formatDuration } from '~/utils/formatDuration'
import Loader from '~/components/Animation/Loader'

type Props = {
  track: ITrack
}

export default function TrackItem({ track }: Props) {
  const { data } = useGetAlbumDetail(track?.album._id)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [trackDurations, setTrackDurations] = useState<number>(0)
  const { currentAlbumIndex, addAlbum, pause, setPause, music } = useMusic()

  useEffect(() => {
    const fetchDurations = async () => {
      const duration = await getAudioDuration(track.path_audio)

      setTrackDurations(duration)
    }
    fetchDurations()
  }, [track])

  const handlePlay = (musicId: string) => {
    const index = data?.result.list_of_tracks.findIndex((track: ITrack) => track._id === musicId)
    if (track.album._id === currentAlbumIndex && musicId === music?._id) {
      setPause(!pause)
    } else {
      addAlbum(track.album._id, index)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: '32px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <img
          alt={track?.name}
          src={track?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
          onError={(e) => {
            e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
          }}
          style={{
            inlineSize: '136px',
            blockSize: '136px',
            objectFit: 'cover',
            borderRadius: '5px'
          }}
        />
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            variant='h4'
            fontWeight='bold'
            sx={{
              'cursor': 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {capitalizeFirstLetterOfEachWord(track.name)}
          </Typography>
          <Typography
            variant='body2'
            fontWeight='bold'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 0.7,
              color: (theme) => theme.palette.neutral.neutral1
            }}
          >
            {'Xuất hiện trong album: '}
            <Typography
              variant='body2'
              fontWeight='bold'
              sx={{
                'cursor': 'pointer',
                'color': (theme) => theme.palette.neutral.neutral1,
                '&:hover': {
                  textDecoration: 'underline',
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
              onClick={() => {
                navigate(`/library/${track.album._id}`)
              }}
            >
              {capitalizeFirstLetterOfEachWord(data?.result.name)}
            </Typography>
          </Typography>
          <Box
            className='icon-actions'
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 1,
              alignItems: 'center'
            }}
          >
            <IconButton
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handlePlay(track._id)}
            >
              <PlayCircleFilledOutlinedIcon sx={{ color: (theme) => theme.palette.secondary4.main, inlineSize: '40px', blockSize: '40px' }} />
            </IconButton>
            <Tooltip title='Thêm vào thư viện' placement='top'>
              <IconButton
                sx={{
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <FavoriteBorderOutlinedIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Khác' placement='top' onClick={handleClick}>
              <IconButton
                sx={{
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <MoreHorizIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            {open && anchorEl && <MenuTrack track={track} open={open} anchorEl={anchorEl} onClose={handleClose} />}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
          <AccessTimeIcon fontSize='small' sx={{ color: (theme) => theme.palette.neutral.neutral1, mr: 4 }} />
        </Box>

        <Box
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
          {music?._id === track._id && !pause ? (
            <Box sx={{ width: '40px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader width='70%' height='60%' barWidth='4px' maxBarHeight='35px' />
            </Box>
          ) : (
            <Typography
              sx={{
                minWidth: 40,
                fontSize: 30,
                pl: 1.5,
                color: track._id === music?._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.neutral.neutral1
              }}
            >
              •
            </Typography>
          )}
          <Box sx={{ flex: 1 }}>
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
              sx={{
                fontSize: 14,
                color: (theme) => theme.palette.neutral.neutral1
              }}
            >
              {track.owners?.map((artist) => (
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
                </Box>
              ))}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Tooltip title='Thêm vào thư viện' placement='top'>
              <IconButton
                sx={{
                  'opacity': 0,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <FavoriteBorderOutlinedIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                fontSize: 14,
                color: (theme) => theme.palette.neutral.neutral1
              }}
            >
              {formatDuration(trackDurations || 0)}
            </Typography>
            <Tooltip title='Khác' placement='top' onClick={handleClick}>
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
            {open && anchorEl && <MenuTrack track={track} open={open} anchorEl={anchorEl} onClose={handleClose} />}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
