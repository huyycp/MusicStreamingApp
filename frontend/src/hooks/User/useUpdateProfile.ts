import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiUpdateProfile } from '~/apis/User/UserAPI'
import { useUser } from '~/hooks/useUser'
import { IUser } from '~/type/User/IUser'

const useUpdateProfile = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { setUser, user } = useUser()

  const {
    mutate: updateProfile,
    isPending,
    isError,
    data
  } = useMutation({
    mutationFn: apiUpdateProfile,
    onSuccess: (response) => {
      enqueueSnackbar('Cập nhật thông tin cá nhân thành công', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setUser({ ...user, name: response?.result.name, avatar: response?.result.avatar } as IUser)
    },
    onError: () => {
      enqueueSnackbar('Không thể cập nhật thông tin cá nhân', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  return {
    updateProfile,
    isPending,
    isError,
    data
  }
}

export default useUpdateProfile
