import Box from '@mui/material/Box'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import IconButton from '@mui/material/IconButton'
import { keyframes } from '@emotion/react'
import { ITrack } from '~/type/Tracks/ITrack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'

type Props = {
  music: ITrack
}
const TextFade = styled(Box)(({ theme }) => ({
  'whiteSpace': 'nowrap',
  'cursor': 'pointer',
  '&:hover': {
    color: theme.palette.secondary4.main,
    textDecoration: 'underline'
  }
}))

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

export default function MusicTag({ music }: Props) {
  return (
    <Box
      sx={{
        'position': 'relative',
        'bgcolor': 'transparent',
        'cursor': 'pointer',
        'borderRadius': '10px',
        'inlineSize': '166px',
        'blockSize': '216px',
        'padding': '12px',
        '&:hover': {
          'bgcolor': (theme) => theme.palette.neutral.neutral3,
          '& .MuiSvgIcon-root': {
            'opacity': 1,
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }
        }
      }}
    >
      <img
        alt={music?.name}
        src={music?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
        }}
        style={{
          inlineSize: '142px',
          blockSize: '142px',
          objectFit: 'cover'
        }}
      />

      <Typography>{capitalizeFirstLetterOfEachWord(music.name)}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          gap: 0.3,
          fontSize: 14,
          color: (theme) => theme.palette.neutral.neutral1,
          overflow: 'hidden'
        }}
      >
        {music.artistsName.map((name, index) => (
          <TextFade key={index}>
            {name}
            {index < music.artistsName.length - 1 && ','}
          </TextFade>
        ))}
      </Box>
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
    </Box>
  )
}
