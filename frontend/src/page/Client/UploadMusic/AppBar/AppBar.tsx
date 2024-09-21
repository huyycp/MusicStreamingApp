import Box from '@mui/material/Box'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import Profile from '../../Main/AppBar/Profile/Profile'

export default function AppBar() {
  const navigate = useNavigate()

  return (
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
            width: '72px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pr: 2,
            pl: 2
          }}
        >
          <SvgIcon component={MusicIcon} inheritViewBox sx={{ height: '32px', width: '32px', cursor: 'pointer' }} onClick={() => navigate('/')} />
        </Box>
      </Tooltip>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title='Thông tin mới'>
          <NotificationsNoneRoundedIcon
            sx={{
              'fontSize': 30,
              'cursor': 'pointer',
              'color': (theme) => theme.palette.neutral.neutral1,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}
