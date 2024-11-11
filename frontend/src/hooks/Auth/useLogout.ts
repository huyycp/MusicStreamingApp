import { useMutation } from '@tanstack/react-query'
import { apiLogout } from '~/apis/Auth/LogoutAPI'
import { useUser } from '../useUser'

const useLogout = () => {
  const { setUser } = useUser()

  return useMutation({
    mutationFn: () => {
      const tokenString = window.localStorage.getItem('refresh_token')
      if (tokenString) {
        return apiLogout({ refresh_token: tokenString })
      } else {
        throw new Error('No refresh token found')
      }
    },
    onSuccess: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(null)
      window.location.href = '/login'
    }
  })
}
export default useLogout
