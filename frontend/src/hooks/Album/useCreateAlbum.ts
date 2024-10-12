import { useMutation } from '@tanstack/react-query'
import { apiCreateAlbum } from '~/apis/Album/AlbumAPI'

const useCreateAlbum = () => {
  return useMutation({
    mutationFn: apiCreateAlbum
  })
}
export default useCreateAlbum
