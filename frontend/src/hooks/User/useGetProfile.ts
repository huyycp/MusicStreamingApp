import { useQuery } from '@tanstack/react-query'
import { apiGetProfile } from '~/apis/User/UserAPI'
import { IResponse } from '~/type/IResponse'

const useGetProfile = () => {
  const access_token = localStorage.getItem('access_token')
  return useQuery<IResponse>({
    queryKey: ['profile'],
    queryFn: () => apiGetProfile(),
    enabled: !!access_token
  })
}
export default useGetProfile
