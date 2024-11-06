import { useQuery } from '@tanstack/react-query'
import { apiGetArtists } from '~/apis/Artist/ArtistAPI'
import { IResponse } from '~/type/IResponse'

const useGetArtist = (limit: number, page: number) => {
  return useQuery<IResponse>({
    queryKey: ['artists', limit, page],
    queryFn: () => apiGetArtists(limit, page)
  })
}

export default useGetArtist
