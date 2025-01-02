import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GradeRoundedIcon from '@mui/icons-material/GradeRounded'
import Typography from '@mui/material/Typography'
import { useFavorite } from '~/hooks/useFavorite'
import IconButton from '@mui/material/IconButton'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded'
import { useMusic } from '~/hooks/useMusic'
import { useNavigate } from 'react-router-dom'
import AlbumIcon from '@mui/icons-material/Album'
import PersonIcon from '@mui/icons-material/Person'

export default function MenuSuggetion() {
  const { favIds } = useFavorite()
  const { addAlbum, setPause, pause, album } = useMusic()

  const navigate = useNavigate()

  const handleAddAlbum = () => {
    if (favIds === album?._id) {
      setPause(!pause)
    } else if (favIds) {
      addAlbum(favIds, 0)
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        width: '100%',
        paddingTop: 2.5
      }}
    >
      <Box
        sx={{
          'cursor': 'pointer',
          'inlineSize': '100%',
          'blockSize': '48px',
          'display': 'flex',
          'flexDirection': 'row',
          'color': (theme) => theme.palette.secondary4.main,
          '&:hover .play-icon': {
            opacity: 1
          },

          '&:hover .play-icon-box': {
            background: (theme) => theme.palette.neutral.neutral2
          }
        }}
        onClick={() => navigate('/liked-music')}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.gradient.gradient3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            aspectRatio: '1/1',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
        >
          <FavoriteIcon />
        </Box>
        <Box
          className='play-icon-box'
          sx={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: (theme) => theme.palette.neutral.neutral3,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 1000 }}>
            Bài hát đã thích
          </Typography>
          <IconButton
            className='play-icon'
            sx={{ opacity: 0, p: 'unset' }}
            onClick={(e) => {
              e.stopPropagation()
              handleAddAlbum()
            }}
          >
            {favIds === album?._id && !pause ? (
              <PauseCircleFilledRoundedIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 30 }} />
            ) : (
              <PlayCircleIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 30 }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          'cursor': 'pointer',
          'inlineSize': '100%',
          'blockSize': '48px',
          'display': 'flex',
          'flexDirection': 'row',
          'color': (theme) => theme.palette.secondary4.main,
          '&:hover .play-icon': {
            opacity: 1
          },

          '&:hover .play-icon-box': {
            background: (theme) => theme.palette.neutral.neutral2
          }
        }}
        onClick={() => navigate('/artist/follow')}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.gradient.gradient2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            aspectRatio: '1/1',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
        >
          <GradeRoundedIcon />
        </Box>
        <Box
          className='play-icon-box'
          sx={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: (theme) => theme.palette.neutral.neutral3,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 1000 }}>
            Nghệ sĩ đang theo dõi
          </Typography>
          <IconButton className='play-icon' sx={{ opacity: 0, p: 'unset' }}>
            <PlayCircleIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          'cursor': 'pointer',
          'inlineSize': '100%',
          'blockSize': '48px',
          'display': 'flex',
          'flexDirection': 'row',
          'color': (theme) => theme.palette.secondary4.main,
          '&:hover .play-icon': {
            opacity: 1
          },

          '&:hover .play-icon-box': {
            background: (theme) => theme.palette.neutral.neutral2
          }
        }}
        onClick={() => navigate('/album')}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.gradient.gradient5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            aspectRatio: '1/1',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
        >
          <AlbumIcon />
        </Box>
        <Box
          className='play-icon-box'
          sx={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: (theme) => theme.palette.neutral.neutral3,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 1000 }}>
            Danh sách album
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          'cursor': 'pointer',
          'inlineSize': '100%',
          'blockSize': '48px',
          'display': 'flex',
          'flexDirection': 'row',
          'color': (theme) => theme.palette.secondary4.main,
          '&:hover .play-icon': {
            opacity: 1
          },

          '&:hover .play-icon-box': {
            background: (theme) => theme.palette.neutral.neutral2
          }
        }}
        onClick={() => navigate('/artist-top')}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.gradient.gradient7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            aspectRatio: '1/1',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
        >
          <PersonIcon />
        </Box>
        <Box
          className='play-icon-box'
          sx={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: (theme) => theme.palette.neutral.neutral3,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 1000 }}>
            Danh sách nghệ sĩ
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
