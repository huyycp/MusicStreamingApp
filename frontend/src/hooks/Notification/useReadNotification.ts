import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiReadNotification } from '~/apis/Notification/NotificationAPI'

const useReadNotification = () => {
  const queryClient = useQueryClient()

  const readNotificationMutation = useMutation({
    mutationFn: apiReadNotification
  })

  const handleReadNotification = (notificationId: string) =>
    readNotificationMutation.mutate(notificationId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['notifications-unread']
        })
        queryClient.invalidateQueries({
          queryKey: ['notifications']
        })
      }
    })

  return {
    readNotification: handleReadNotification,
    isPending: readNotificationMutation.isPending
  }
}

export default useReadNotification
