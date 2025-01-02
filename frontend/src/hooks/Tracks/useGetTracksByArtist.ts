import { apiGetTracksByArtist, ITrackResponse } from '~/apis/Tracks/TrackAPI'
import { useInfiniteQuery } from '@tanstack/react-query'

type TrackStatus = 'all' | 'pending' | 'available' | 'banned' | 'occupied'

const useGetTracksByArtist = (limit: number = 5, status: TrackStatus = 'all') => {
  return useInfiniteQuery<ITrackResponse>({
    queryKey: ['tracksList', status],
    queryFn: async ({ pageParam = 0 }) => {
      return apiGetTracksByArtist(limit, Number(pageParam), status)
    },
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}

export default useGetTracksByArtist
