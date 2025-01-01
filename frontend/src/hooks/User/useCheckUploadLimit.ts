import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiCheckUploadLimit } from '~/apis/User/UserAPI'

const useCheckUploadLimit = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: checkUploadLimit, isPending: isChecking } = useMutation({
    mutationFn: apiCheckUploadLimit,
    onError: () => {
      enqueueSnackbar('Đã đạt giới hạn số bài hát tải lên miễn phí', {
        variant: 'error',
        autoHideDuration: 3000
      })
    },
    onSuccess: (response) => {
      if (response.result === true) {
        enqueueSnackbar('Đã đạt giới hạn số bài hát tải lên miễn phí', {
          variant: 'error',
          autoHideDuration: 3000
        })
      } else {
        window.location.href = '/upload-music'
      }
    }
  })

  return {
    checkUploadLimit,
    isChecking
  }
}

export default useCheckUploadLimit
