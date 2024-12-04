import { useQuery } from '@tanstack/react-query'
import { apiSearch } from '~/apis/Search/SearchAPI'

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['search', keyword],
    queryFn: () => apiSearch(keyword),
    enabled: !!keyword
  })
}
export default useSearch
