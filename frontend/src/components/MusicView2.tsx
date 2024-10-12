import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useResize } from '~/hooks/useResize'
import PushPinIcon from '@mui/icons-material/PushPin'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

type Props = {
  type: string
  totalMusic?: number | 0
}

// Styled component for the cover image
const CoverImage = styled('div')({
  'position': 'relative',
  'width': 48,
  'height': 48,
  'objectFit': 'cover',
  'overflow': 'hidden',
  'flexShrink': 0,
  'borderRadius': 10,
  'padding': 1,
  'backgroundColor': 'rgba(0,0,0,0.08)', // Default background color
  '& > img': {
    inlineSize: '100%',
    blockSize: '100%',
    objectFit: 'cover'
  },
  'transition': 'background-color 0.3s'
})
const TextFade = styled(Box)(({ theme }) => ({
  'fontSize': 11,
  'display': 'flex',
  'alignItems': 'center',
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  'cursor': 'pointer',
  '&:hover': {
    color: theme.palette.secondary4.main,
    textDecoration: 'underline'
  }
}))

export default function MusicView1({ type = 'album', totalMusic }: Props) {
  const { widths, minWidths } = useResize()
  const navigate = useNavigate()

  const handleGetList = () => {
    if (type === 'liked-music') {
      navigate('/liked-music/tracks')
    }
    if (type === 'my-music') {
      navigate('/my-music')
    }
  }
  const handleClick = () => {}

  return (
    <Box
      sx={{
        'borderRadius': '10px',
        'cursor': 'pointer',
        'overflow': 'hidden',
        '&:hover': {
          bgcolor: (theme) => theme.palette.neutral.neutral3
        },
        '&:hover .cover-image': {
          backgroundColor: 'rgba(0,0,0,0.9)'
        },
        '&:hover .MuiIconButton-root': {
          opacity: 1
        }
      }}
      onClick={handleClick}
    >
      {widths[0] !== minWidths[0] && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            padding: 1
          }}
          onClick={handleGetList}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CoverImage className='cover-image'>
              <Box
                sx={{
                  inlineSize: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  blockSize: '48px',
                  background: (theme) => theme.palette.gradient.gradient1,
                  color: (theme) => theme.palette.secondary4.main
                }}
                onClick={handleGetList}
              >
                {type === 'liked-music' && <FavoriteIcon />}
                {type === 'my-music' && <CloudUploadIcon />}
              </Box>
            </CoverImage>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Box
                sx={{
                  color: (theme) => theme.palette.secondary4.main,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxInlineSize: 'auto'
                }}
              >
                {type === 'liked-music' && 'Bài hát đã thích'}
                {type === 'my-music' && 'Bài hát của bạn'}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
                {type !== 'album' && (
                  <TextFade>
                    <PushPinIcon sx={{ fontSize: 15, color: (theme) => theme.palette.primary.main, transform: 'rotate(45deg)' }} />
                    {` ${totalMusic} bài hát`}
                  </TextFade>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {widths[0] === minWidths[0] && (
        <CoverImage className='cover-image' onClick={handleGetList}>
          <Box
            sx={{
              inlineSize: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              blockSize: '48px',
              background: (theme) => theme.palette.gradient.gradient1,
              color: (theme) => theme.palette.secondary4.main
            }}
            onClick={handleGetList}
          >
            {type === 'liked-music' && <FavoriteIcon />}
            {type === 'my-music' && <CloudUploadIcon />}
          </Box>
        </CoverImage>
      )}
    </Box>
  )
}
