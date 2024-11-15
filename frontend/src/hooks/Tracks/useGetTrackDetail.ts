import { useQuery } from '@tanstack/react-query'
import { apiGetTrackDetail } from '~/apis/Tracks/TrackAPI'
import { IResponse } from '~/type/IResponse'

const useGetTrackDetail = (trackId: string | null) => {
  return useQuery<IResponse>({
    queryKey: ['trackDetail', trackId],
    queryFn: () => apiGetTrackDetail(trackId as string),
    enabled: trackId !== null
  })
}
export default useGetTrackDetail
