import { useMutation } from '@tanstack/react-query'

import { apiForgotPassword } from '~/apis/Auth/LoginAPI'

const useForgotPassword = () => {
  return useMutation({
    mutationFn: apiForgotPassword
  })
}
export default useForgotPassword
