import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Divider from '@mui/material/Divider'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useRef, useState } from 'react'
import LaunchIcon from '@mui/icons-material/Launch'
import useLogout from '~/hooks/Auth/useLogout'

export default function Profile() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { mutate: logout } = useLogout()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])
  return (
    <Box>
      <Tooltip title='Lê Trương Tuấn Anh'>
        <Box
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          sx={{
            'width': '48px',
            'height': '48px',
            'borderRadius': '100%',
            'bgcolor': (theme) => theme.palette.secondary2.main,
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            'cursor': 'pointer',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Avatar
            alt='Lê Trương Tuấn Anh'
            sx={{
              '&.MuiAvatar-root': {
                width: '32px',
                height: '32px'
              }
            }}
          >
            {'Lê Trương Tuấn Anh'.charAt(0)}
          </Avatar>
        </Box>
      </Tooltip>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper
              sx={{
                bgcolor: (theme) => theme.palette.secondary2.main
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                  sx={{
                    'padding': '4px',
                    'color': 'white',
                    '.MuiMenuItem-root': {
                      'fontSize': '14px',
                      'p': '12px 8px 12px 12px',
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.neutral.neutral1
                      }
                    }
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    Tài khoản <LaunchIcon sx={{ fontSize: 20, ml: 3 }} />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Hồ sơ</MenuItem>
                  <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
                  <Divider
                    variant='middle'
                    component='li'
                    sx={{
                      'margin': 'unset',
                      'bgcolor': (theme) => theme.palette.neutral.neutral1,
                      '.MuiDivider-root': {
                        margin: 'unset'
                      }
                    }}
                  />
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}
