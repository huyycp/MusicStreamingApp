import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import Footer from './Footer/Footer'
import { styled } from '@mui/material/styles'
import { useMusic } from '~/hooks/useMusic'

const CoverImage = styled('div')({
  '@keyframes shrink': {
    from: {
      'transform': 'scale(1)',
      'transform-origin': 'bottom left'
    },
    to: {
      'transform': 'scale(0.35)',
      'transform-origin': 'bottom left'
    }
  },
  'position': 'relative',
  'width': '294px',
  'height': '294px',
  'overflow': 'hidden',
  'flexShrink': 0,
  'borderRadius': '8px',
  'backgroundColor': 'rgba(0,0,0,0.08)',
  'animation': 'shrink 1.5s ease forwards'
})

const TextFade = styled(Box)(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  'cursor': 'pointer',
  'transition': 'margin 1.5s ease',
  '&:hover': {
    color: theme.palette.secondary4.main,
    textDecoration: 'underline'
  }
}))

const ContentBox = styled(Box)({
  'display': 'flex',
  'flexDirection': 'column',
  'transition': 'transform 1.5s ease',
  '@keyframes moveLeft': {
    from: {
      transform: 'translateX(0)'
    },
    to: {
      transform: 'translateX(-180px)'
    }
  },
  'animation': 'moveLeft 1.5s ease forwards'
})

type Props = {
  // eslint-disable-next-line no-unused-vars
  setFullScreen: (value: React.SetStateAction<boolean>) => void
}

export default function FullScreenView({ setFullScreen }: Props) {
  const { music } = useMusic()
  return (
    <Box
      sx={{
        position: 'fixed',
        insetBlockStart: 0,
        insetInlineStart: 0,
        inlineSize: '100vw',
        blockSize: '100vh',
        backgroundColor: (theme) => theme.palette.secondary2.main,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0px 66px'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          inlineSize: '100%',
          blockSize: '152px',
          display: 'flex',
          alignItems: 'center',
          gap: 3
        }}
      >
        <SvgIcon component={MusicIcon} inheritViewBox sx={{ blockSize: '36px', inlineSize: '36px', cursor: 'pointer' }} />
        <Box
          sx={{
            display: 'flex-1',
            alignItems: 'center',
            gap: 1,
            fontSize: 14,
            color: (theme) => theme.palette.neutral.neutral2
          }}
        >
          <Box sx={{ textTransform: 'uppercase' }}>Phát từ danh sách phát</Box>
          <Box sx={{ fontWeight: 'bold' }}>Album 1</Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ inlineSize: '100%', flex: 1, display: 'flex', alignItems: 'end' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'end' }}>
          <CoverImage>
            <img alt={music?.name} src={music?.image.replace('{w}x{h}bb', '294x294bb')} />
          </CoverImage>
          <ContentBox>
            <TextFade sx={{ fontSize: 30, fontWeight: 'bold' }}>{music?.name}</TextFade>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: 0.3,
                fontSize: 13,
                color: (theme) => theme.palette.neutral.neutral1,
                overflow: 'hidden'
              }}
            >
              {(music?.owners ?? []).map((owner, index) => (
                <TextFade key={index}>
                  {typeof owner === 'string' ? owner : owner.name}
                  {index < (music?.owners ?? []).length - 1 && ','}
                </TextFade>
              ))}
            </Box>
          </ContentBox>
        </Box>
      </Box>

      {/* Footer */}
      <Footer setFullScreen={setFullScreen} />
    </Box>
  )
}
