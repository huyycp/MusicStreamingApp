import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useEffect, useState } from 'react'
import { registerSchema } from '~/validate/registerValidate'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import useForgotPassword from '~/hooks/Auth/useForgotPassword'
import CircularProgress from '@mui/material/CircularProgress'
import useRegister from '~/hooks/Auth/useRegister'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const { error: errorApi, isPending, mutate: forgotPassword } = useForgotPassword()
  const { checkEmail, isPending: isPending3 } = useRegister()

  useEffect(() => {
    document.title = 'Magic Music - Reset Password'
  }, [])

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
    try {
      await registerSchema.validate({ email: value }, { abortEarly: false })
      setError('')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const emailError = err.errors.find((error) => error.includes('email'))
        setError(emailError || '')
      }
    }
  }
  const handleNext = () => {
    if (email === '') setError('Mật khẩu không được bỏ trống')
    else if (email !== '' && error === '') {
      checkEmail(
        { email },
        {
          onSuccess: (data) => {
            if (data.result === true) {
              forgotPassword(
                { email },
                {
                  onSuccess: () => {
                    navigate('/reset-password/change-password', { state: { email } })
                  }
                }
              )
            } else setError('Email chưa được đăng ký')
          },
          onError: (error) => {
            setError(error.message)
          }
        }
      )
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: '0px 32px' }}>
      <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>
        Xác nhận Email của bạn
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'center', mb: '40px' }}>
        Vui lòng kiểm tra Email của bạn để xác thực tài khoản
      </Typography>
      <FormControl sx={{ width: '100%', pb: 2 }} error={!!error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Địa chỉ email</Box>
        <Input
          id='my-input'
          aria-describedby='my-helper-text'
          placeholder='name@domain.com'
          value={email}
          onChange={handleChange}
          sx={{
            'borderColor': error !== '' ? 'red' : '',
            '&:hover': {
              borderColor: error !== '' ? 'red' : ''
            },
            '&.Mui-focused': {
              borderColor: error !== '' ? 'red' : ''
            }
          }}
        />
        {error && (
          <FormHelperText
            id='my-helper-text'
            sx={{ fontSize: 12, m: 'unset', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5, pt: 1 }}
          >
            <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
            {error}
          </FormHelperText>
        )}
        {errorApi && (
          <FormHelperText
            id='api-helper-text'
            sx={{ fontSize: 12, m: 'unset', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5, pt: 1, color: 'red' }}
          >
            <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
            Lỗi: {errorApi.message}
          </FormHelperText>
        )}
      </FormControl>
      {!isPending && !isPending3 && (
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Gửi lại mã xác thực
        </Button>
      )}
      {(isPending || isPending3) && <CircularProgress color='success' />}
    </Box>
  )
}
