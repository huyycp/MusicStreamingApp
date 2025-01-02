import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetAlbums } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetInfiniteAlbum = (limit: number = 5) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['albumInfinite', limit],
    queryFn: async ({ pageParam = 0 }) => {
      return apiGetAlbums(limit, Number(pageParam))
    },
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}
export default useGetInfiniteAlbum
