import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import { keyframes } from '@emotion/react'
import { IArtist } from '~/type/Artist/IArtist'
import { useNavigate } from 'react-router-dom'

type Props = {
  artist: IArtist
}

export default function ArtistTag({ artist }: Props) {
  const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        'position': 'relative',
        'bgcolor': 'transparent',
        'cursor': 'pointer',
        'borderRadius': '10px',
        'width': '162px',
        'minHeight': '216px',
        'padding': '12px',
        '&:hover': {
          'bgcolor': (theme) => ({
            background: `linear-gradient(to top, ${theme.palette.neutral.neutral3}, ${theme.palette.secondary2.main})`
          }),
          '& .MuiSvgIcon-root': {
            'opacity': 1,
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }
        }
      }}
      onClick={() => navigate(`/artist/${artist._id}`)}
    >
      <img
        alt={artist.name}
        src={artist.avatar || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
        }}
        style={{
          inlineSize: '138px',
          blockSize: '138px',
          objectFit: 'cover',
          borderRadius: '100%'
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          insetBlockStart: '45%',
          insetInlineStart: '55%',
          animation: `${slideUp} 0.5s ease forwards`
        }}
      >
        <PlayCircleFilledOutlinedIcon sx={{ color: (theme) => theme.palette.primary.main, opacity: 0, inlineSize: '48px', blockSize: '48px' }} />
      </IconButton>
      <Box sx={{ color: (theme) => theme.palette.secondary4.main, textTransform: 'uppercase' }}>{artist.name}</Box>
      <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Artist</Box>
    </Box>
  )
}
