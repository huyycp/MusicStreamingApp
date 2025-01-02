import { useQuery } from '@tanstack/react-query'
import { apiGetArtistWeeklyTopView } from '~/apis/Top/TopAPI'
import { IResponse } from '~/type/IResponse'

const useGetArtistWeeklyTop = () => {
  return useQuery<IResponse>({
    queryKey: ['artistWeekly'],
    queryFn: () => apiGetArtistWeeklyTopView()
  })
}

export default useGetArtistWeeklyTop
