import Box from '@mui/material/Box'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import Tooltip from '@mui/material/Tooltip'
import { useRef, useState } from 'react'
import MenuList from '@mui/material/MenuList'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import useCountUnreadNotification from '~/hooks/Notification/useCountUnreadNotification'
import useGetNotification from '~/hooks/Notification/useGetNotification'
import NotiItem from './NotiItem/NotiItem'
import useReadAllNotification from '~/hooks/Notification/useReadAllNotification'
import { useQueryClient } from '@tanstack/react-query'

export default function Notification() {
  const { data } = useCountUnreadNotification()
  const { data: listNotification, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNotification(3)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const count = data?.result || 0
  const { mutate } = useReadAllNotification()
  const queryClient = useQueryClient()

  const notifications = listNotification?.pages?.flatMap((page) => page.result.data) ?? []

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const loadMoreNotifications = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }
  const handleMarkAllAsRead = () => {
    mutate(undefined, {
      onSuccess: () => {
        setOpen(false)
        queryClient.invalidateQueries({
          queryKey: ['notifications-unread']
        })
        queryClient.invalidateQueries({
          queryKey: ['notifications']
        })
      }
    })
  }

  return (
    <Box position='relative' display='inline-flex' ref={anchorRef}>
      <Tooltip title='Thông báo mới' onClick={handleToggle}>
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
      {count > 0 && (
        <Box
          position='absolute'
          bottom={-4}
          right={-4}
          bgcolor='red'
          color='white'
          fontSize='10px'
          fontWeight='bold'
          width={15}
          height={15}
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {count}
        </Box>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        sx={{
          zIndex: 9999,
          overflow: 'auto',
          width: '400px',
          maxHeight: '80vh'
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
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      color: (theme) => theme.palette.secondary4.main
                    }}
                  >
                    <Typography variant='subtitle1' fontWeight='bold' sx={{ pl: 2 }}>
                      Thông báo
                    </Typography>
                    {count > 0 && (
                      <Button startIcon={<DoneAllIcon />} size='small' variant='contained' onClick={handleMarkAllAsRead}>
                        Đã đọc tất cả
                      </Button>
                    )}
                  </Box>
                  <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                    {notifications.map((notification) => (
                      <NotiItem key={notification._id} notification={notification} />
                    ))}
                    {hasNextPage && (
                      <Box textAlign='center' py={1} color='gray'>
                        <button
                          onClick={loadMoreNotifications}
                          disabled={isFetchingNextPage}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: isFetchingNextPage ? 'not-allowed' : 'pointer',
                            color: 'gray',
                            fontSize: '14px'
                          }}
                        >
                          {isFetchingNextPage ? 'Đang tải...' : 'Tải thêm'}
                        </button>
                      </Box>
                    )}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}
