import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { Outlet } from 'react-router-dom'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'

export default function AuthLayout() {
  return (
    <Box
      sx={{
        bgcolor: '#000000',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      <SvgIcon component={MusicIcon} inheritViewBox sx={{ height: '96px', pt: '32px', pb: '24px', width: '100%', cursor: 'pointer' }} />
      <Box sx={{ width: '390px', height: 'auto', flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          height: '82px',
          p: '24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          textAlign: 'center',
          flexDirection: 'column',
          color: (theme) => theme.palette.neutral.neutral1,
          marginTop: 'auto'
        }}
      >
        <Box>This site is protected by reCAPTCHA and the Google</Box>
        <Box>
          <Box
            component='span'
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => window.open('https://policies.google.com/privacy', '_blank')}
          >
            Privacy Policy
          </Box>{' '}
          and{' '}
          <Box
            component='span'
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => window.open('https://policies.google.com/terms', '_blank')}
          >
            Terms of Service
          </Box>{' '}
          apply.
        </Box>
      </Box>
    </Box>
  )
}
