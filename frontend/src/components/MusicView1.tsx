import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { useResize } from '~/hooks/useResize'
import { useMusic } from '~/hooks/useMusic'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import { useNavigate } from 'react-router-dom'
import { ILibrary } from '~/type/Library/ILibrary'

type Props = {
  initAlbum: ILibrary
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

export default function MusicView1({ initAlbum }: Props) {
  const { widths, minWidths } = useResize()
  const { addAlbum, currentAlbumIndex, pause, setPause } = useMusic()
  const navigate = useNavigate()

  const handlePlay = () => {
    if (initAlbum._id !== currentAlbumIndex) {
      addAlbum(initAlbum._id, 0)
    } else if (!pause) setPause(true)
    else setPause(false)
  }
  const handleClick = () => {
    navigate(`/library/${initAlbum._id}`)
  }

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
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CoverImage className='cover-image'>
              <img
                alt={initAlbum?.name}
                src={
                  initAlbum?.image?.replace('{w}x{h}bb', '48x48bb') ||
                  'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                }
                style={{
                  inlineSize: '48px',
                  blockSize: '48px',
                  objectFit: 'cover'
                }}
              />
              <IconButton
                sx={{
                  'color': (theme) => theme.palette.secondary4.main,
                  'position': 'absolute',
                  'top': '50%',
                  'left': '50%',
                  'transform': 'translate(-50%, -50%)',
                  'height': '24px',
                  'width': '24px',
                  'borderRadius': '100%',
                  'opacity': 0,
                  'transition': 'opacity 0.3s',
                  'bgcolor': (theme) => theme.palette.secondary2.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.secondary2.main
                  }
                }}
                onClick={handlePlay}
              >
                {currentAlbumIndex === initAlbum?._id && (pause === true ? <PlayArrowIcon /> : <PauseIcon />)}
                {currentAlbumIndex !== initAlbum?._id && <PlayArrowIcon />}
              </IconButton>
            </CoverImage>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Box
                sx={{
                  color: currentAlbumIndex === initAlbum?._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.secondary4.main,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxInlineSize: 'auto'
                }}
              >
                {initAlbum?.name}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
                {(initAlbum.owners ?? []).map((owner, index) => (
                  <TextFade key={index}>
                    {typeof owner === 'string' ? owner : owner.name}
                    {index < (initAlbum.owners ?? []).length - 1 && ','}
                  </TextFade>
                ))}
              </Box>
            </Box>
          </Box>

          {currentAlbumIndex === initAlbum?._id && <VolumeUpOutlinedIcon sx={{ color: (theme) => theme.palette.primary.main }} />}
        </Box>
      )}
      {widths[0] === minWidths[0] && (
        <CoverImage className='cover-image'>
          <img
            alt={initAlbum?.name}
            src={
              initAlbum?.image?.replace('{w}x{h}bb', '48x48bb') ||
              'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
            }
            style={{
              inlineSize: '48px',
              blockSize: '48px',
              objectFit: 'cover'
            }}
          />
        </CoverImage>
      )}
    </Box>
  )
}
