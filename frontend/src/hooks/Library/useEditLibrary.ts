import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiEditLibrary } from '~/apis/Album/AlbumAPI'

const useEditLibrary = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { mutate: editLibrary, isPending } = useMutation({
    mutationFn: apiEditLibrary,
    onSuccess: (response) => {
      enqueueSnackbar('Đã cập nhật thông tin thư viện thành công', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['myLibrary'] })
      queryClient.invalidateQueries({ queryKey: ['library', response.result._id] })
    },
    onError: () => {
      enqueueSnackbar('Không thể cập nhật thông tin thư viện', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  return {
    editLibrary,
    isPending
  }
}

export default useEditLibrary
