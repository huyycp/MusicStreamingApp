import { Box, Typography, Paper, Chip, Stack } from '@mui/material'
import {
  NotificationsOutlined as BellIcon,
  DescriptionOutlined as FileIcon,
  AccessTimeOutlined as ClockIcon,
  RemoveRedEyeOutlined as EyeIcon
} from '@mui/icons-material'
import { INotification } from '~/type/Notification/INotification'
import { formatDate } from '~/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import useReadNotification from '~/hooks/Notification/useReadNotification'

type NotificationItemProps = {
  notification: INotification
}

const NotiItem = ({ notification }: NotificationItemProps) => {
  const { title, content, type, seen } = notification
  const navigate = useNavigate()
  const { readNotification } = useReadNotification()

  const getIcon = () => {
    switch (type) {
    case 'reports':
      return <FileIcon color='primary' />
    default:
      return <BellIcon color='primary' />
    }
  }

  const handleOnClick = () => {
    if (type === 'tracks') {
      readNotification(notification._id)
      navigate(`/track/${notification.artifact_id}`)
    }
    else if (type === 'reports') {
      readNotification(notification._id)
      navigate(`/report/${notification.artifact_id}`)
    }
  }

  return (
    <Paper
      elevation={0}
      onClick={handleOnClick}
      sx={{
        'cursor': 'pointer',
        'p': 2,
        'bgcolor': (theme) => theme.palette.secondary2.main,
        'color': (theme) => theme.palette.secondary4.main,
        '&:hover': {
          bgcolor: (theme) => theme.palette.neutral.neutral3
        }
      }}
    >
      <Stack direction='row' spacing={2}>
        <Box>{getIcon()}</Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </Typography>

            {!seen && <Chip label='Mới' size='small' color='primary' sx={{ height: 20 }} />}
          </Stack>

          <Typography
            variant='body2'
            sx={{
              color: (theme) => theme.palette.neutral.neutral1,
              mt: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {content}
          </Typography>

          <Stack direction='row' spacing={2} alignItems='center' sx={{ mt: 1 }}>
            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              sx={{ typography: 'caption', color: (theme) => theme.palette.neutral.neutral1, display: 'flex', flexDirection: 'row', gap: 0.5 }}
            >
              <ClockIcon sx={{ fontSize: 16 }} />
              {formatDate(notification.created_at)}
            </Stack>

            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              sx={{ typography: 'caption', color: (theme) => theme.palette.neutral.neutral1, display: 'flex', flexDirection: 'row', gap: 0.5 }}
            >
              <EyeIcon sx={{ fontSize: 16 }} />
              {seen ? 'Đã xem' : 'Chưa xem'}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}

export default NotiItem
