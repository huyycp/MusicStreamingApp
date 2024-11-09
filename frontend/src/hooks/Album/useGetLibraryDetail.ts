import { useQuery } from '@tanstack/react-query'
import { apiGetLibraryItem } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumDetail = (libraryId: string | null) => {
  return useQuery<IResponse>({
    queryKey: ['library', libraryId],
    queryFn: () => apiGetLibraryItem(libraryId as string),
    enabled: libraryId !== null
  })
}
export default useGetAlbumDetail
