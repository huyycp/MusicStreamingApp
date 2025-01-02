import { useMutation } from '@tanstack/react-query'
import { apiLogin } from '~/apis/Auth/LoginAPI'
import { useUser } from '../useUser'

const useLogin = () => {
  const { setUser } = useUser()

  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.result

      if (access_token && refresh_token) {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
      }
      setUser(data.result)
      window.location.href = '/'
    }
  })
}
export default useLogin
