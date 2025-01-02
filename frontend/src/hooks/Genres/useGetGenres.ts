import { useQuery } from '@tanstack/react-query'
import { apiGetGenres } from '~/apis/Genres/GenresAPI'
import { IResponse } from '~/type/IResponse'

const useGetGenres = () => {
  return useQuery<IResponse>({
    queryKey: ['genres'],
    queryFn: () => apiGetGenres()
  })
}
export default useGetGenres
