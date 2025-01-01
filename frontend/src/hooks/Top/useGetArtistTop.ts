import { useQuery } from '@tanstack/react-query'
import { apiGetArtistTopView } from '~/apis/Top/TopAPI'

const useGetArtistTop = () => {
  return useQuery({
    queryKey: ['artistTop'],
    queryFn: () => apiGetArtistTopView()
  })
}

export default useGetArtistTop
