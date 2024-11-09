import { useMutation } from '@tanstack/react-query'
import { apiAddTrackToLibrary } from '~/apis/Album/AlbumAPI'

const useAddTrackToAlbum = () => {
  return useMutation({
    mutationFn: apiAddTrackToLibrary
  })
}
export default useAddTrackToAlbum
