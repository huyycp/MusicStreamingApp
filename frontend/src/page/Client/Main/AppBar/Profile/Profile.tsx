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
import { useUser } from '~/hooks/useUser'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { user } = useUser()
  const profileData = user
  const { mutate: logout } = useLogout()
  const navigate = useNavigate()
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
      {profileData && (
        <Tooltip title={profileData ? profileData.name : ''}>
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
              alt={profileData.name}
              sx={{
                '&.MuiAvatar-root': {
                  width: '32px',
                  height: '32px'
                }
              }}
            >
              {profileData?.name?.charAt(0) || 'A'}
            </Avatar>
          </Box>
        </Tooltip>
      )}
      {!profileData && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: 'row'
          }}
        >
          <Tooltip title='Đăng nhập'>
            <Button variant='contained' color='secondary' sx={{ fontWeight: 'bold' }} onClick={() => navigate('/login')}>
              Đăng nhập
            </Button>
          </Tooltip>
          <Tooltip title='Đăng ký'>
            <Button variant='outlined' sx={{ fontWeight: 'bold' }} onClick={() => navigate('/register')}>
              Đăng ký
            </Button>
          </Tooltip>
        </Box>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        sx={{
          zIndex: 9999
        }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport'
            }
          }
        ]}
      >
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
              {profileData && (
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
                    <MenuItem
                      onClick={(e) => {
                        navigate(`/user/${profileData._id}`)
                        handleClose(e)
                      }}
                    >
                      Hồ sơ <LaunchIcon sx={{ fontSize: 20, ml: 3 }} />
                    </MenuItem>
                    <MenuItem component='a' href='/genres' target='_blank' rel='noopener noreferrer'>
                      Sở thích của bạn
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/my-report')}>Báo cáo của bạn</MenuItem>
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
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}
