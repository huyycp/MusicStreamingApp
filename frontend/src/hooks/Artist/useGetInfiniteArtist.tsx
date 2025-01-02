import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetArtists } from '~/apis/Artist/ArtistAPI'
import { IResponse } from '~/type/IResponse'

const useGetInfiniteArtist = (limit: number = 5) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['artistInfinite', limit],
    queryFn: async ({ pageParam = 0 }) => {
      return apiGetArtists(limit, Number(pageParam))
    },
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}
export default useGetInfiniteArtist
