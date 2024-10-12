import { useQuery } from '@tanstack/react-query'
import { apiGetAlbumsByArtist } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumByArtist = (limit: number = 5, page: number = 1) => {
  return useQuery<IResponse>({
    queryKey: ['albums', limit, page],
    queryFn: () => apiGetAlbumsByArtist(limit, page)
  })
}
export default useGetAlbumByArtist
