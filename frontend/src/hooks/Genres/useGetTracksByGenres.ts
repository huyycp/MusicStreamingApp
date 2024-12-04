import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetTracksByGenres } from '~/apis/Genres/GenresAPI'
import { IResponse } from '~/type/IResponse'

const useGetTracksByGenres = (limit: number = 5, genres: string | undefined) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['trackByGenres', limit],
    queryFn: async ({ pageParam = 1 }) => {
      return apiGetTracksByGenres(genres, limit, Number(pageParam))
    },
    enabled: genres !== undefined,
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 1
  })
}

export default useGetTracksByGenres
