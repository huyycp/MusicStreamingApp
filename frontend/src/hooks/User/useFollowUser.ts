import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiFollowUser, apiUnFollowUser } from '~/apis/User/UserAPI'
import { useFavorite } from '../useFavorite'

const useFollowUser = () => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { isUserFollow } = useFavorite()

  const { mutate: followUser, isPending: isFollowing } = useMutation({
    mutationFn: apiFollowUser,
    onSuccess: () => {
      enqueueSnackbar('Theo dõi người dùng thành công', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['listFollow'] })
    },
    onError: () => {
      enqueueSnackbar('Không thể theo dõi người dùng', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  const { mutate: unfollowUser, isPending: isUnfollowing } = useMutation({
    mutationFn: apiUnFollowUser,
    onSuccess: () => {
      enqueueSnackbar('Hủy theo dõi người dùng thành công', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['listFollow'] })
    },
    onError: () => {
      enqueueSnackbar('Không thể hủy theo dõi người dùng', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  const toggleFollow = (userId: string) => {
    if (isUserFollow(userId)) {
      unfollowUser(userId)
    } else {
      followUser(userId)
    }
  }

  return {
    toggleFollow,
    isPending: isFollowing || isUnfollowing
  }
}
export default useFollowUser
