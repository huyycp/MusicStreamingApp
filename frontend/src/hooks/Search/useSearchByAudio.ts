import { useQuery } from '@tanstack/react-query'
import { apiSearchByAudio } from '~/apis/Search/SearchAPI'

const useSearchByAudio = (audioFile: File | null) => {
  return useQuery({
    queryKey: ['searchByAudio', audioFile?.name],
    queryFn: () => apiSearchByAudio(audioFile as File),
    enabled: !!audioFile,
    retry: false,
    staleTime: 0
  })
}

export default useSearchByAudio
