import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiDeleteLibraryItem } from '~/apis/Album/AlbumAPI'

const useDeletePlayListItem = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const deletePlayListItemMutation = useMutation({
    mutationFn: apiDeleteLibraryItem,
    onSuccess: () => {
      enqueueSnackbar('Đã xóa danh sách phát', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['myLibrary'] })
    },
    onError: () => {
      enqueueSnackbar('Không thể xóa danh sách phát', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  const handleDeletePlayListItem = (libraryId: string) => deletePlayListItemMutation.mutate(libraryId)

  return {
    deletePlayListItem: handleDeletePlayListItem,
    isPending: deletePlayListItemMutation.isPending
  }
}

export default useDeletePlayListItem
