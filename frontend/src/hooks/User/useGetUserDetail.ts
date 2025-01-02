import { useQuery } from '@tanstack/react-query'
import { apiGetUserDetail } from '~/apis/User/UserAPI'

const useGetUserDetail = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-detail'],
    queryFn: () => apiGetUserDetail(userId as string),
    enabled: userId !== undefined
  })
}

export default useGetUserDetail
