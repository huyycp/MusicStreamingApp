import { AudiotrackRounded, ReportGmailerrorredRounded } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

interface NotificationProps {
  _id: string
  user_id: string
  title: string
  content: string
  type: string
  artifact_id: string
  seen: boolean
  created_at: string
  updated_at: string
}

interface NotificationListProps {
  notifications: NotificationProps[]
  // eslint-disable-next-line no-unused-vars
  onNotificationClick: (index: number) => void
}

interface NotificationContainerProps {
  seen: boolean
}

const NotificationContainer = styled.div<NotificationContainerProps>`
  display: flex;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  background-color: var(--secondary1-main);
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${(props) => (props.seen ? 'var(--neutral1)' : 'var(--secondary4-main)')};

  &:hover {
    background-color: var(--secondary-main-color);
  }
`

const Avatar = styled.div`
  display: flex;
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
  margin-right: 15px;
  background-color: green !important;
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`

const Message = styled.div`
  flex: 1;
  font-size: 16px;
`

const Timestamp = styled.div`
  font-size: 12px;
  color: #888;
`

const NotificationItem: React.FC<NotificationProps & { onClick: () => void }> = ({ type, content, created_at, seen, onClick }) => (
  <NotificationContainer seen={seen} onClick={onClick}>
    {type === 'reports' ? (
      <Avatar>
        <ReportGmailerrorredRounded sx={{ color: 'white', width: '40px', height: '40px' }} />
      </Avatar>
    ) : (
      <Avatar>
        <AudiotrackRounded sx={{ color: 'white', width: '40px', height: '40px' }} />
      </Avatar>
    )}

    <div>
      <Message>{content}</Message>
      <Timestamp style={{ color: 'var(--main-color)' }}>{created_at ? new Date(created_at).toLocaleString() : 'N/A'}</Timestamp>
    </div>
  </NotificationContainer>
)

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onNotificationClick }) => {
  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificationItem key={notification._id} {...notification} onClick={() => onNotificationClick(index)} />
      ))}
    </div>
  )
}

export default NotificationList
