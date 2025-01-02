import { IResponse } from '~/type/IResponse'

import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetNotifications } from '~/apis/Notification/NotificationAPI'

const useGetNotification = (limit: number = 5) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 0 }) => {
      return apiGetNotifications(limit, Number(pageParam))
    },
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}

export default useGetNotification
