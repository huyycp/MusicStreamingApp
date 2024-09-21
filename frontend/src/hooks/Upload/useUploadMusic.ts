import { useMutation } from '@tanstack/react-query'
import { apiUploadMusic } from '~/apis/Upload/UploadMusicAPI'

const useUploadMusic = () => {
  return useMutation({
    mutationFn: apiUploadMusic
  })
}
export default useUploadMusic
