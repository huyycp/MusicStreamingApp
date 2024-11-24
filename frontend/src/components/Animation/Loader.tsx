import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'

interface LoaderProps {
  width?: string | number
  height?: string | number
  barWidth?: string | number
  maxBarHeight?: string | number
}

export default function Loader({ width = '100%', height = '100%', barWidth = '12px', maxBarHeight = '80px' }: LoaderProps) {
  const keyframes = {
    '@keyframes up_down': {
      '0%, 100%': {
        height: '2px'
      },
      '50%': {
        height: maxBarHeight
      }
    }
  }

  const commonBarStyle = {
    width: barWidth,
    height: '2px',
    borderRadius: '10px',
    backgroundColor: 'white',
    animation: 'up_down 1.5s ease-in-out infinite'
  }

  const getBarStyle = (delay: number) => ({
    ...commonBarStyle,
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    animationDelay: `${delay}s`
  })

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        ...keyframes
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <Box sx={getBarStyle(1.0)} />
        <Box sx={getBarStyle(0.8)} />
        <Box sx={getBarStyle(0.4)} />
        <Box sx={getBarStyle(0.2)} />
        <Box sx={getBarStyle(0.6)} />
      </Box>
    </Box>
  )
}
