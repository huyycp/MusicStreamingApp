import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { useResize } from '~/hooks/useResize'
import PushPinIcon from '@mui/icons-material/PushPin'
import { IMusic } from '~/type/IMusic'
import { useMusic } from '~/hooks/useMusic'
import { useNavigate } from 'react-router-dom'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'

type Props = {
  initMusic?: IMusic
  collection?: boolean | false
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
    width: '100%',
    height: '100%',
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

export default function MusicView1({ initMusic, collection, totalMusic }: Props) {
  const { widths, minWidths } = useResize()
  const { changeMusic, pause, music } = useMusic()
  const navigate = useNavigate()

  const handlePlay = () => {
    if (!collection && initMusic) {
      changeMusic(initMusic)
    }
  }
  const handleClick = () => {
    if (!collection && initMusic) {
      navigate(`/playlist/${initMusic._id}`)
    } else navigate('/collection/tracks')
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
            justifyContent: 'space-between', // Đảm bảo icon cuối nằm sát mép phải
            gap: 1,
            padding: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CoverImage className='cover-image'>
              {!collection && (
                <img
                  alt={initMusic?.name}
                  src={initMusic?.artUrl?.replace('{w}x{h}bb', '48x48bb')}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover'
                  }}
                />
              )}
              {collection && <Box sx={{ width: '48px', height: '48px', background: (theme) => theme.palette.gradient.gradient1 }}></Box>}
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
                {music._id === initMusic?._id && (pause === true ? <PlayArrowIcon /> : <PauseIcon />)}
                {music._id !== initMusic?._id && <PlayArrowIcon />}
              </IconButton>
            </CoverImage>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Box
                sx={{
                  color: music._id === initMusic?._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.secondary4.main,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 'auto'
                }}
              >
                {initMusic?.name || 'Bài hát đã thích'}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
                {!collection &&
                  initMusic?.artistName?.map((name, index) => (
                    <TextFade key={index}>
                      {name}
                      {index < initMusic.artistName.length - 1 && ','}
                    </TextFade>
                  ))}
                {collection && (
                  <TextFade>
                    <PushPinIcon sx={{ fontSize: 15, color: (theme) => theme.palette.primary.main, transform: 'rotate(45deg)' }} />
                    {` ${totalMusic} bài hát`}
                  </TextFade>
                )}
              </Box>
            </Box>
          </Box>

          {music._id === initMusic?._id && <VolumeUpOutlinedIcon sx={{ color: (theme) => theme.palette.primary.main }} />}
        </Box>
      )}
      {widths[0] === minWidths[0] && (
        <CoverImage className='cover-image'>
          {!collection && (
            <img
              alt={initMusic?.name}
              src={initMusic?.artUrl?.replace('{w}x{h}bb', '48x48bb')}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover'
              }}
            />
          )}
          {collection && <Box sx={{ width: '48px', height: '48px', background: (theme) => theme.palette.gradient.gradient1 }}></Box>}
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
            // onClick={() => setIsPlay(!isPlay)}
          >
            {music._id === initMusic?._id && (pause === true ? <PlayArrowIcon /> : <PauseIcon />)}
            {music._id !== initMusic?._id && <PlayArrowIcon />}
          </IconButton>
        </CoverImage>
      )}
    </Box>
  )
}
