import { useMutation } from '@tanstack/react-query'
import { apiChangeGenres } from '~/apis/Genres/GenresAPI'

const useChangeGenres = () => {
  return useMutation({
    mutationFn: apiChangeGenres
  })
}
export default useChangeGenres
