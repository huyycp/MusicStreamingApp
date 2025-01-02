import { useQuery } from '@tanstack/react-query'
import { apiGetTracks, ITrackResponse } from '~/apis/Tracks/TrackAPI'

const useGetTracks = (limit: number = 5, page: number = 0) => {
  return useQuery<ITrackResponse>({
    queryKey: ['tracks', limit, page],
    queryFn: () => apiGetTracks(limit, page)
  })
}
export default useGetTracks
