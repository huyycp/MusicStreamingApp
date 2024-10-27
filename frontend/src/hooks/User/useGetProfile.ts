import { useQuery } from '@tanstack/react-query'
import { apiGetProfile } from '~/apis/User/UserAPI'
import { IResponse } from '~/type/IResponse'

const useGetProfile = () => {
  return useQuery<IResponse>({
    queryKey: ['profile'],
    queryFn: () => apiGetProfile()
  })
}
export default useGetProfile
