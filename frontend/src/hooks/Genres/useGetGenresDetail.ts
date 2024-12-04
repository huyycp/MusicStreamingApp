import { useQuery } from '@tanstack/react-query'
import { apiGetGenresDetail } from '~/apis/Genres/GenresAPI'
import { IResponse } from '~/type/IResponse'

const useGetGenresDetail = (genres: string | undefined) => {
  return useQuery<IResponse>({
    queryKey: ['genresDetail', genres],
    queryFn: () => apiGetGenresDetail(genres as string),
    enabled: genres !== undefined
  })
}
export default useGetGenresDetail
