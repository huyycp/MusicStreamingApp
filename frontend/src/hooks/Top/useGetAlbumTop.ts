import { useQuery } from '@tanstack/react-query'
import { apiGetAlbumTopView } from '~/apis/Top/TopAPI'

const useGetAlbumTop = () => {
  return useQuery({
    queryKey: ['albumTop'],
    queryFn: () => apiGetAlbumTopView()
  })
}

export default useGetAlbumTop
