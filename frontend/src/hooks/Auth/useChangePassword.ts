import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { apiResetPassword, apiVerifyPassword } from '~/apis/Auth/LoginAPI'

const useChangePassword = () => {

  const [password, setPassword] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  const verifyPasswordMutation = useMutation({
    mutationFn: apiVerifyPassword,
    onSuccess: () => {
      if (password != null && email != null) {
        changePasswordMutation.mutate({ email, password })
      }
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: apiResetPassword,
    onSuccess: () => {
      window.location.href = '/login'
    }
  })

  const isPending = verifyPasswordMutation.isPending || changePasswordMutation.isPending
  const error = verifyPasswordMutation.error || changePasswordMutation.error

  const handleVerifyPassword = (data: { email: string; otp: string }, password: string) => {
    setPassword(password)
    setEmail(data.email)
    verifyPasswordMutation.mutate(data)
  }

  return {
    verifyPassword: handleVerifyPassword,
    error: error instanceof Error ? error.message : '',
    isPending
  }
}

export default useChangePassword
