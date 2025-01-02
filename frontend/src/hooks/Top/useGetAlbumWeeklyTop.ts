import { useQuery } from '@tanstack/react-query'
import { apiGetAlbumWeeklyTopView } from '~/apis/Top/TopAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumWeeklyTop = () => {
  return useQuery<IResponse>({
    queryKey: ['albumWeeklyTop'],
    queryFn: () => apiGetAlbumWeeklyTopView()
  })
}

export default useGetAlbumWeeklyTop
