import { useQuery } from '@tanstack/react-query'
import { apiGetArtistAlbums } from '~/apis/Artist/ArtistAPI'
import { IResponse } from '~/type/IResponse'

const useGetAlbumWithArtist = (artistId: string | null, limit: number, page: number) => {
  return useQuery<IResponse>({
    queryKey: ['artists', artistId, limit, page],
    queryFn: () => apiGetArtistAlbums(artistId as string, limit, page),
    enabled: artistId !== null
  })
}

export default useGetAlbumWithArtist
