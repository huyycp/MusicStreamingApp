import { useMutation } from '@tanstack/react-query'
import { apiUpdateProfile } from '~/apis/User/UserAPI'

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: apiUpdateProfile
  })
}

export default useUpdateProfile
