import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetAlbumsByArtist } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumByArtist = (limit: number = 5) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['albumsByArtist', limit],
    queryFn: async ({ pageParam = 1 }) => {
      return apiGetAlbumsByArtist(limit, Number(pageParam))
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.result?.data.length < limit) {
        return undefined
      }
      return pages.length + 1
    },
    initialPageParam: 1
  })
}

export default useGetAlbumByArtist
