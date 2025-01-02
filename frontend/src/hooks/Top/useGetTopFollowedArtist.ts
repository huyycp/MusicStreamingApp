import { useQuery } from '@tanstack/react-query'
import { apiGetTopFollowedArtist } from '~/apis/Top/TopAPI'

const useGetTopFollowedArtist = () => {
  return useQuery({
    queryKey: ['top-followed-artist'],
    queryFn: apiGetTopFollowedArtist
  })
}

export default useGetTopFollowedArtist
