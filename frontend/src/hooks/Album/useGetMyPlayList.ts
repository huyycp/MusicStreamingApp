import { useQuery } from '@tanstack/react-query'
import { apiGetMyPlaylists } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetMyPlayList = (limit: number = 5, page: number = 1) => {
  return useQuery<IResponse>({
    queryKey: ['myPlaylist', limit, page],
    queryFn: () => apiGetMyPlaylists(limit, page)
  })
}
export default useGetMyPlayList
