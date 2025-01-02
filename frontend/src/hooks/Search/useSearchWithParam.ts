import { useQuery } from '@tanstack/react-query'
import { apiSearchWithParam } from '~/apis/Search/SearchAPI'

export const useSearchWithParam = (keyword: string, type: 'albums' | 'artists' | 'tracks') => {
  return useQuery({
    queryKey: ['searchWithParam', keyword, type],
    queryFn: () => apiSearchWithParam(keyword, type),
    enabled: !!keyword,
    gcTime: 0,
    staleTime: 0
  })
}
