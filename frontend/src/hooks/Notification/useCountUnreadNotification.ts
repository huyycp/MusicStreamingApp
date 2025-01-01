import { useQuery } from '@tanstack/react-query'
import { apiCountUnreadNotification } from '~/apis/Notification/NotificationAPI'

const useCountUnreadNotification = () =>
  useQuery({
    queryKey: ['notifications-unread'],
    queryFn: apiCountUnreadNotification
  })

export default useCountUnreadNotification
