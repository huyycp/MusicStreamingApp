import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Fragment, useState } from 'react'
import { IAlbum } from '~/type/Album/IAlbum'
import { formatDate } from '~/utils/formatDate'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type Props = {
  album: IAlbum
}

export default function AlbumInfo({ album }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <Box display='flex' flexDirection='column'>
      {album && (
        <Box>
          <Box
            position='relative'
            width='100%'
            maxWidth='400px'
            height='0'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
              aspectRatio: '1 / 1',
              overflow: 'hidden',
              borderRadius: '10px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            <img
              alt={album?.name}
              src={album?.image}
              onError={(e) => {
                e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: hover ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
            />

            {hover && (
              <Box
                position='absolute'
                top={0}
                left={0}
                width='100%'
                height='100%'
                bgcolor='rgba(0, 0, 0, 0.5)'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <PlayCircleOutlineIcon
                  sx={{
                    'fontSize': '64px',
                    'color': 'white',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                />
              </Box>
            )}
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' sx={{ mt: 1 }}>
            <Typography noWrap sx={{ fontSize: 18, fontWeight: 'bold' }}>
              {album?.name}
            </Typography>
            <Typography noWrap sx={{ fontSize: 12, color: (theme) => theme.palette.neutral.neutral1 }}>
              Cập nhật: {formatDate(album?.created_at)}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                cursor: 'pointer',
                color: (theme) => theme.palette.neutral.neutral1,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.3
              }}
            >
              {album.artistsName.map((artist, index) => (
                <Fragment key={artist}>
                  <Typography
                    component='span'
                    sx={{
                      'fontSize': 12,
                      'cursor': 'pointer',
                      'color': (theme) => theme.palette.neutral.neutral1,
                      '&:hover': {
                        color: (theme) => theme.palette.secondary4.main,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {artist}
                  </Typography>
                  {index < album.artistsName.length - 1 && ','}
                </Fragment>
              ))}
            </Typography>
            <Typography noWrap sx={{ fontSize: 12, color: (theme) => theme.palette.neutral.neutral1, mb: 2 }}>
              99 người yêu thích
            </Typography>
            <Button variant='contained' startIcon={<PlayArrowIcon />}>
              PHÁT TẤT CẢ
            </Button>
            <Box sx={{ pt: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Tooltip title='Thêm vào thư viên' placement='top'>
                <IconButton sx={{ backgroundColor: (theme) => theme.palette.neutral.neutral3 }}>
                  <FavoriteBorderIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Khác' placement='top'>
                <IconButton sx={{ backgroundColor: (theme) => theme.palette.neutral.neutral3 }}>
                  <MoreHorizIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
