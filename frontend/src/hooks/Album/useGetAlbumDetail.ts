import { useQuery } from '@tanstack/react-query'
import { getAlbumDetail } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumDetail = (albumId: string) => {
  return useQuery<IResponse>({
    queryKey: ['albums', albumId],
    queryFn: () => getAlbumDetail(albumId)
  })
}
export default useGetAlbumDetail
