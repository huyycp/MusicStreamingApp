import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '~/apis/Auth/LoginAPI'

const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.result

      if (access_token && refresh_token) {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
      }
      navigate('/')
    }
  })
}
export default useLogin
