import Box from '@mui/material/Box'
import AppBar from './AppBar/AppBar'
import { Outlet } from 'react-router-dom'
import { UploadProvider } from '~/contents/UploadProvider'
import MusicDisk from '~/components/MusicDisk'

export default function UploadMusicLayout() {
  return (
    <Box
      sx={{
        minInlineSize: '784px',
        bgcolor: '#000000',
        inlineSize: '100%',
        blockOverflow: '100vh',
        minHeight: '100vh',
        overflowY: 'hidden',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
      }}
    >
      <UploadProvider>
        <AppBar />
        <MusicDisk />
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
      </UploadProvider>
    </Box>
  )
}
