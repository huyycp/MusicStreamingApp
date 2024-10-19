import { useQuery } from '@tanstack/react-query'
import { getAlbumDetail } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumDetail = (albumId: string | null) => {
  return useQuery<IResponse>({
    queryKey: ['albums', albumId],
    queryFn: () => getAlbumDetail(albumId as string),
    enabled: albumId !== null
  })
}
export default useGetAlbumDetail
