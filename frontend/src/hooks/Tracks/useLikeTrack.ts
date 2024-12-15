import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { apiLikeTrack, apiUnLikeTrack } from '~/apis/Tracks/TrackAPI'
import { useFavorite } from '../useFavorite'

const useAddToFavorite = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { favTracks } = useFavorite()
  const queryClient = useQueryClient()

  const trackIds = favTracks.map((track) => track._id)

  const { mutate: removeFromFavorite, isPending: isRemoving } = useMutation({
    mutationFn: apiUnLikeTrack,
    onSuccess: () => {
      enqueueSnackbar('Đã xóa bài hát khỏi thư viện yêu thích', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['favorite'] })
    },
    onError: () => {
      enqueueSnackbar('Không thể xóa bài hát khỏi thư viện', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  const { mutate: addTrackToFavorite, isPending: isAdding } = useMutation({
    mutationFn: apiLikeTrack,
    onSuccess: () => {
      enqueueSnackbar('Đã thêm bài hát vào thư viện yêu thích', {
        variant: 'success',
        autoHideDuration: 3000
      })

      queryClient.invalidateQueries({ queryKey: ['favorite'] })
    },
    onError: () => {
      enqueueSnackbar('Không thể thêm bài hát vào thư viện', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  })

  const toggleFavorite = (trackList: string[]) => {
    const tracksToRemove = trackList.filter((trackId) => trackIds.includes(trackId))
    const tracksToAdd = trackList.filter((trackId) => !trackIds.includes(trackId))

    if (tracksToRemove.length > 0) {
      removeFromFavorite(tracksToRemove)
    }

    if (tracksToAdd.length > 0) {
      addTrackToFavorite(tracksToAdd)
    }
  }

  return {
    addToFavorite: toggleFavorite,
    isPending: isAdding || isRemoving
  }
}

export default useAddToFavorite
