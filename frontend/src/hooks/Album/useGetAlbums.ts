import { useQuery } from '@tanstack/react-query'
import { apiGetAlbums } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbums = (limit: number = 5, page: number = 1) => {
  return useQuery<IResponse>({
    queryKey: ['albums', limit, page],
    queryFn: () => apiGetAlbums(limit, page)
  })
}
export default useGetAlbums
