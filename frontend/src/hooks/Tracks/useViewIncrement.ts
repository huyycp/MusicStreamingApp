import { useMutation } from '@tanstack/react-query'
import { apiViewIncrement } from '~/apis/Tracks/TrackAPI'

const useViewIncrement = () => {
  const viewIncrementMutation = useMutation({
    mutationFn: apiViewIncrement
  })

  const handleViewIncrement = (trackId: string) => viewIncrementMutation.mutate(trackId)

  return {
    viewIncrement: handleViewIncrement,
    isPending: viewIncrementMutation.isPending
  }
}

export default useViewIncrement
