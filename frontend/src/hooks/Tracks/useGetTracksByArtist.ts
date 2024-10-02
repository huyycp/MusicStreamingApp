import { useQuery } from '@tanstack/react-query'
import { apiGetTracksByArtist, ITrackResponse } from '~/apis/Tracks/TrackAPI'

type TrackStatus = 'all' | 'pending' | 'available'

const useGetTracksByArtist = (limit: number = 100, page: number = 0, status: TrackStatus = 'all') => {
  return useQuery<ITrackResponse>({
    queryKey: ['tracks', limit, page, status],
    queryFn: () => apiGetTracksByArtist(limit, page, status)
  })
}
export default useGetTracksByArtist
