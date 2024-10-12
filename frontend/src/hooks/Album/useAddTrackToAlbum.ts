import { useMutation } from '@tanstack/react-query'
import { apiAddTrackToAlbum } from '~/apis/Album/AlbumAPI'

const useAddTrackToAlbum = () => {
  return useMutation({
    mutationFn: apiAddTrackToAlbum
  })
}
export default useAddTrackToAlbum
