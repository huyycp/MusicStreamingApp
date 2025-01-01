import { useQuery } from '@tanstack/react-query'
import { apiGetTrackWeeklyTopView } from '~/apis/Top/TopAPI'
import { IResponse } from '~/type/IResponse'

const useGetTrackWeeklyTop = () => {
  return useQuery<IResponse>({
    queryKey: ['trackWeeklyTop'],
    queryFn: () => apiGetTrackWeeklyTopView()
  })
}

export default useGetTrackWeeklyTop
