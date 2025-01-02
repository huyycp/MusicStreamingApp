import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGetListFollow } from '~/apis/User/UserAPI'
import { IResponse } from '~/type/IResponse'

const useGetListFollow = (limit: number = 5, page: number = 0) => {
  return useInfiniteQuery<IResponse>({
    queryKey: ['listFollow', limit, page],
    queryFn: () => apiGetListFollow(limit, page),
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage?.result?.data.length === limit
      return hasNextPage ? pages.length + 1 : undefined
    },
    initialPageParam: 0
  })
}
export default useGetListFollow
