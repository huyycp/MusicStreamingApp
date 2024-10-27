import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Outlet, useNavigate } from 'react-router-dom'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function AppBar() {
  const navigate = useNavigate()

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.music.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1
        }}
      >
        <Tooltip title='Magic Music'>
          <Box
            sx={{
              cursor: 'pointer',
              width: 'auto',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 2,
              pr: 2,
              pl: 2
            }}
            onClick={() => navigate('/')}
          >
            <SvgIcon component={MusicIcon} inheritViewBox sx={{ height: '48px', width: '48px', cursor: 'pointer' }} />
            <Typography variant='h6' sx={{ color: 'white' }} noWrap>
              Magic Music
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title='Hồ sơ'>
          <Box
            sx={{
              cursor: 'pointer',
              width: 'auto',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 2,
              pr: 2,
              pl: 2
            }}
          >
            <AccountCircleIcon sx={{ width: '48px', height: '48px', color: (theme) => theme.palette.primary.main }} />
            <Typography variant='body1' sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '600' }}>
              Hồ sơ
            </Typography>
          </Box>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
