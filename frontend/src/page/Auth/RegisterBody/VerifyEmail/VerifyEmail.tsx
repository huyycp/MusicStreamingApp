import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useLocation, useNavigate } from 'react-router-dom'
import useRegister from '~/hooks/Auth/useRegister'

export default function VerifyEmail() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string>('')
  const { getOTP, error: errorApi, isPending, verifyEmail } = useRegister()
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email as string
  const password = location.state?.password as string
  const gender = location.state?.gender as string
  const name = location.state?.name as string
  const role = location.state?.role as string

  useEffect(() => {
    if (!email || !password || !name || !gender || !role) navigate('/register')
  }, [email, password, name, gender, navigate, role])

  useEffect(() => {
    document.title = 'Magic Music - Register: Verify'
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setOtp(value)
    if (!/[0-9]/.test(value) || value.length !== 6) {
      setError('Mã không hợp lệ')
    } else {
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (error === '') {
      verifyEmail({ email, otp }, { email, password, gender, name, role })
    }
  }

  const handleResend = async () => {
    getOTP({ email })
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: '0px 32px' }}>
      <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>
        Mã xác nhận
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'center', mb: '40px' }}>
        Vui lòng kiểm tra Email của bạn để xác thực tài khoản
      </Typography>
      <FormControl sx={{ width: '100%', pb: 2 }} error={!!error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Nhập mã xác nhận</Box>
        <Input
          id='my-input'
          aria-describedby='my-helper-text'
          placeholder='XXXXXX'
          value={otp}
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
            Lỗi: {errorApi}
          </FormHelperText>
        )}
      </FormControl>
      <Divider sx={{ width: '100%', bgcolor: (theme) => theme.palette.neutral.neutral1, mb: '40px' }} />
      <Button sx={{ width: '50%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleSubmit}>
        {isPending ? 'Đang xử lý...' : 'Xác thực'}
      </Button>
      <Button sx={{ width: '50%', fontSize: 14, fontWeight: 'bold', mt: 1 }} variant='outlined' onClick={handleResend}>
        {isPending ? 'Đang gửi...' : 'Gửi lại mã'}
      </Button>
    </Box>
  )
}
