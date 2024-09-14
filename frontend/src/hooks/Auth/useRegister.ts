import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiCheckEmail, apiGetOTP, apiRegister, apiVerifyEmail } from '~/apis/Auth/RegisterAPI'
import { RegisterData } from '~/type/Auth/RegisterData'

const useRegister = () => {
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState<RegisterData | null>(null)

  const verifyEmailMutation = useMutation({
    mutationFn: apiVerifyEmail,
    onSuccess: () => {
      if (registerData) {
        registerMutation.mutate(registerData)
      }
    }
  })

  const registerMutation = useMutation({
    mutationFn: apiRegister,
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.result

      if (access_token && refresh_token) {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
      }
      navigate('/')
    }
  })

  const checkEmail = useMutation({
    mutationFn: apiCheckEmail
  })

  const getOTPMutation = useMutation({
    mutationFn: apiGetOTP
  })

  const isPending = verifyEmailMutation.isPending || registerMutation.isPending || getOTPMutation.isPending || checkEmail.isPending
  const error = verifyEmailMutation.error || registerMutation.error || getOTPMutation.error || checkEmail.error

  const handleVerifyEmail = (data: { email: string; otp: string }, registerData: RegisterData) => {
    setRegisterData(registerData)
    verifyEmailMutation.mutate(data)
  }

  return {
    verifyEmail: handleVerifyEmail,
    getOTP: getOTPMutation.mutate,
    checkEmail: checkEmail.mutate,
    error: error instanceof Error ? error.message : '',
    isPending
  }
}

export default useRegister
