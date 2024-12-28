import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '~/firebaseConfig'
import useRegister from './useRegister'
import useLogin from './useLogin'
import { useState } from 'react'

const useGoogleAuth = () => {
  const { checkEmail } = useRegister()
  const navigate = useNavigate()
  const { mutate } = useLogin()
  const [error, setError] = useState<string>('')

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const email = user.email
      const uid = user.uid
      const displayName = user.displayName

      if (!email || !displayName) throw new Error('Lỗi: Không thể lấy thông tin Google!')

      checkEmail(
        { email },
        {
          onSuccess: (data) => {
            if (data.result === false) navigate('/register/step2', { state: { email, password: uid, displayName: displayName, type: 'oauth' } })
            else {
              mutate(
                { email, password: uid },
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
    googleSignIn,
    googleError: error
    // isPending: loginMutation.isPending || registerMutation.isPending
  }
}

export default useGoogleAuth
