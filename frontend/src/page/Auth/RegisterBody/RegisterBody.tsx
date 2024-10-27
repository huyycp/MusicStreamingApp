import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import * as Yup from 'yup'
import { registerSchema } from '~/validate/registerValidate'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import GoogleIcon from '~/assets/icon/GoogleIcon.svg?react'
import SvgIcon from '@mui/icons-material/ErrorOutline'
import { useNavigate } from 'react-router-dom'
import useRegister from '~/hooks/Auth/useRegister'
import CircularProgress from '@mui/material/CircularProgress'

export default function RegisterBody() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>('')
  const { checkEmail, isPending } = useRegister()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Magic Music - Register'
  }, [])

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
    try {
      await registerSchema.validate({ email: value }, { abortEarly: false })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const emailError = err.errors.find((error) => error.includes('email'))
        setError(emailError || '')
      }
    }
  }

  const handleNext = () => {
    if (email === '') setError('Email này không hợp lệ. Hãy đảm bảo rằng email được nhập dưới dạng example@email.com')
    else if (email !== '' && error === '') {
      checkEmail(
        { email },
        {
          onSuccess: (data) => {
            if (data.result === false) navigate('/register/step1', { state: { email } })
            else setError('Email đã tồn tại')
          }
        }
      )
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: '0px 32px' }}>
      <Typography variant='h3' fontWeight='bold' sx={{ textAlign: 'center', mb: '40px' }}>
        Đăng ký để bắt đầu nghe
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
      </FormControl>
      {!isPending && (
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Tiếp theo
        </Button>
      )}
      {isPending && <CircularProgress color='success' />}
      <Box sx={{ mt: '32px', width: '100%' }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
          <Divider
            sx={{
              bgcolor: (theme) => theme.palette.neutral.neutral1,
              width: '40%'
            }}
          />
          <Typography variant='body2' sx={{ whiteSpace: 'nowrap', px: 2 }}>
            hoặc
          </Typography>
          <Divider
            sx={{
              bgcolor: (theme) => theme.palette.neutral.neutral1,
              width: '40%'
            }}
          />
        </Box>
        <Button
          variant='outlined'
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}
        >
          <SvgIcon component={GoogleIcon} inheritViewBox sx={{ height: '24px', width: '24px', mr: 1 }} />
          <Box sx={{ fontWeight: 'bold', fontSize: 14 }}>Đăng ký bằng Google</Box>
        </Button>
        <Divider sx={{ width: '100%', bgcolor: (theme) => theme.palette.neutral.neutral2, mt: 4, mb: 3 }}></Divider>
        <Box sx={{ fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', pl: 3, pr: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral2 }}>Bạn đã có tài khoản?</Box>
          <Box
            sx={{ color: (theme) => theme.palette.secondary4.main, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => window.location.href = '/login'}
          >
            Đăng nhập tại đây
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
