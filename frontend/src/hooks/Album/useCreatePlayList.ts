import { apiCreatePlaylist } from '~/apis/Album/AlbumAPI'
import { useMutation } from '@tanstack/react-query'

const useCreatePlayList = () => {
  return useMutation({
    mutationFn: apiCreatePlaylist
  })
}

export default useCreatePlayList
