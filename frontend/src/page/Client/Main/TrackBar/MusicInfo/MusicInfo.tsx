import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { ITrack } from '~/type/Tracks/ITrack'

const CoverImage = styled('div')({
  'position': 'relative',
  'width': 56,
  'height': 56,
  'objectFit': 'cover',
  'overflow': 'hidden',
  'flexShrink': 0,
  'borderRadius': 8,
  'backgroundColor': 'rgba(0,0,0,0.08)',
  '& > img': {
    inlineSize: '100%',
    blockSize: '100%',
    objectFit: 'cover'
  },
  '&:hover .MuiIconButton-root': {
    opacity: 1
  }
})

const TextFade = styled(Box)(({ theme }) => ({
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
type Props = {
  music: ITrack
}

export default function MusicInfo({ music }: Props) {
  const [isZoom, setIsZoom] = useState<boolean>(false)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        pl: '8px',
        gap: 1,
        flex: '1 1 auto',
        overflow: 'hidden'
      }}
    >
      <CoverImage>
        <img
          alt={music.name}
          src={music.image.replace('{w}x{h}bb', '56x56bb')}
          onError={(e) => {
            e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
          }}
          style={{
            inlineSize: '56px',
            blockSize: '56px',
            objectFit: 'cover'
          }}
        />
        <Tooltip title={isZoom ? 'Phóng to' : 'Thu nhỏ'}>
          <IconButton
            sx={{
              'color': (theme) => theme.palette.secondary4.main,
              'position': 'absolute',
              'top': '5%',
              'right': '5%',
              'height': '24px',
              'width': '24px',
              'borderRadius': '100%',
              'opacity': 0,
              'transition': 'opacity 0.3s',
              '&:hover': {
                bgcolor: (theme) => theme.palette.secondary2.main
              }
            }}
            onClick={() => setIsZoom(!isZoom)}
          >
            {isZoom ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Tooltip>
      </CoverImage>
      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <TextFade sx={{ fontSize: 14, fontWeight: '450' }}>{music.name}</TextFade>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: 0.3,
              fontSize: 11,
              color: (theme) => theme.palette.neutral.neutral1,
              overflow: 'hidden'
            }}
          >
            {(music.owners ?? []).map((owner, index) => (
              <TextFade key={index}>
                {typeof owner === 'string' ? owner : owner.name}
                {index < (music.owners ?? []).length - 1 && ','}
              </TextFade>
            ))}
          </Box>
        </Box>
        <Tooltip title='Thêm vào bài hát đã thích'>
          <ControlPointIcon
            sx={{
              'color': (theme) => theme.palette.neutral.neutral1,
              'cursor': 'pointer',
              'fontSize': 18,
              'ml': 1,
              'flexShrink': 0,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  )
}
