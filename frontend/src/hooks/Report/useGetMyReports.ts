import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetReports } from '~/apis/Report/ReportAPI'

export type TrackStatus = 'all' | 'pending' | 'resolved' | 'dismissed'

const useGetMyReports = (limit: number, status: TrackStatus = 'all') => {
  return useInfiniteQuery({
    queryKey: ['my-reports', status],
    queryFn: async ({ pageParam = 0 }) => {
      return apiGetReports(limit, Number(pageParam), status)
    },
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}

export default useGetMyReports
