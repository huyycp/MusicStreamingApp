import { useQuery } from '@tanstack/react-query'
import { apiGetMyLibrary } from '~/apis/Album/AlbumAPI'
import { IResponse } from '~/type/IResponse'

const useGetMyLibrary = (limit: number = 5, page: number = 1) => {
  const access_token = localStorage.getItem('access_token')
  return useQuery<IResponse>({
    queryKey: ['myLibrary', limit, page],
    queryFn: () => apiGetMyLibrary(limit, page),
    enabled: !!access_token
  })
}
export default useGetMyLibrary
