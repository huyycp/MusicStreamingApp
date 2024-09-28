import { useQuery } from '@tanstack/react-query'
import { apiGetTracks } from '~/apis/Tracks/TrackAPI'
import { ITrack } from '~/type/Tracks/ITrack'

const useGetTracks = () => {
  return useQuery<{ message: string; result: ITrack[] }>({
    queryKey: ['tracks'],
    queryFn: apiGetTracks
  })
}
export default useGetTracks
