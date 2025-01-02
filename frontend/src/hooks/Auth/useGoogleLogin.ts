import useRegister from './useRegister'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '~/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import useLogin from './useLogin'
import { useState } from 'react'

const useGoogleLogin = () => {
  const { checkEmail } = useRegister()
  const { mutate } = useLogin()
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const email = user.email
      const uid = user.uid
      const displayName = user.displayName

      if (!email) throw new Error('Lỗi: Không thể lấy thông tin Google!')

      checkEmail(
        { email },
        {
          onSuccess: (data) => {
            if (data.result === false) navigate('/register/step2', { state: { email, password: uid, displayName: displayName } })
            else {
              mutate(
                { email, password: uid, type: 'oauth' },
                {
                  onError: () => {
                    setError('Email đã được tạo bằng các phương thức khác')
                  }
                }
              )
            }
          }
        }
      )
    } catch {
      //
    }
  }
  return {
    googleLogin,
    error
  }
}
export default useGoogleLogin
