/* eslint-disable indent */
import Box from '@mui/material/Box'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import IconButton from '@mui/material/IconButton'
import { keyframes } from '@emotion/react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import { useNavigate } from 'react-router-dom'
import { ILibrary } from '~/type/Library/ILibrary'
import theme from '~/theme'

type Props = {
  tag?: string
  album: ILibrary
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

export default function AlbumTag({ album, tag }: Props) {
  const navigate = useNavigate()
  const changeColor = (tag: string) => {
    switch (tag) {
      case 'week-top10':
        return theme.palette.gradient.gradient2
      case 'top10':
        return theme.palette.gradient.gradient1
      default:
        return 'linear-gradient(90deg, #FFC837 0%, #FF8008 100%)'
    }
  }

  const title = (tag: string) => {
    switch (tag) {
      case 'week-top10':
        return 'Top 10 tuần'
      case 'top10':
        return 'Top 10'
      default:
        return 'Top 10'
    }
  }

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
        'overflow': 'hidden',
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
      onClick={() => navigate(`/library/${album._id}`)}
    >
      {tag && (
        <Box
          sx={{
            position: 'absolute',
            width: 120,
            top: 20,
            left: -28,
            overflow: 'hidden',
            background: changeColor(tag),
            color: (theme) => theme.palette.primary.contrastText,
            padding: '4px 24px',
            transform: 'rotate(-45deg)',
            fontWeight: 'bold',
            fontSize: '12px',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {title(tag)}
        </Box>
      )}

      <img
        alt={album?.name}
        src={album?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
        }}
        style={{
          inlineSize: '142px',
          blockSize: '142px',
          objectFit: 'cover',
          position: 'relative'
        }}
      />

      <Typography noWrap>{capitalizeFirstLetterOfEachWord(album.name)}</Typography>
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
        {(album.owners ?? []).map((owner, index) => (
          <TextFade key={index}>
            {typeof owner === 'string' ? owner : owner.name}
            {index < (album.owners ?? []).length - 1 && ','}
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
