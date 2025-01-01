import { useMutation } from '@tanstack/react-query'
import { apiReadAllNotification } from '~/apis/Notification/NotificationAPI'

const useReadAllNotification = () =>
  useMutation({
    mutationFn: apiReadAllNotification
  })

export default useReadAllNotification
