import Box from '@mui/material/Box'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Typography from '@mui/material/Typography'
import useChangePassword from '~/hooks/Auth/useChangePassword'
import CircularProgress from '@mui/material/CircularProgress'

export default function ChangePassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email as string

  useEffect(() => {
    if (!email) {
      navigate('/login')
    }
  }, [email, navigate])

  useEffect(() => {
    document.title = 'Magic Music - Change Password'
  }, [])

  const [visible, setVisible] = useState(true)
  const [visible2, setVisible2] = useState(true)
  const [otp, setOtp] = useState('')
  const [check1, setCheck1] = useState<boolean | null>(null)
  const [check2, setCheck2] = useState<boolean | null>(null)
  const [check3, setCheck3] = useState<boolean | null>(null)
  const { isPending, error: errorApi, verifyPassword } = useChangePassword()
  const [errorOtp, setErrorOtp] = useState<string>('')
  const handleChangeOTP = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setOtp(value)
    if (!/[0-9]/.test(value) || value.length !== 6) {
      setErrorOtp('Mã không hợp lệ')
    } else {
      setErrorOtp('')
    }
  }

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string>('')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
    setCheck1(/[a-zA-Z]/.test(value)) // Kiểm tra có chữ cái hay không
    setCheck2(/[\d!?#&]/.test(value)) // Kiểm tra có chữ số hoặc ký tự đặc biệt hay không
    setCheck3(value.length >= 10) // Kiểm tra độ dài mật khẩu tối thiểu
    if (check1 !== true && check2 !== true && check3 !== true) setError('')
  }
  const handleNext = () => {
    if (password === '') setError('Mật khẩu không được bỏ trống')
    else if (password !== confirmPassword) setError('Kiểm tra lại mật khẩu của bạn')
    else if (error === '') {
      verifyPassword({ email, otp }, password)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>
        Tạo mật khẩu mới
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'center', mb: '40px' }}>
        Vui lòng nhập mật khẩu mới bên dưới cho tài khoản MagicMusic của bạn.
      </Typography>
      <FormControl sx={{ inlineSize: '100%', pb: 1, pl: 5, pr: 5 }} error={!!errorOtp}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Nhập mã xác nhận</Box>
        <Input
          id='my-input3'
          aria-describedby='my-helper-text3'
          placeholder='XXXXXX'
          value={otp}
          onChange={handleChangeOTP}
          sx={{
            'borderColor': errorOtp !== '' ? 'red' : '',
            '&:hover': {
              borderColor: errorOtp !== '' ? 'red' : ''
            },
            '&.Mui-focused': {
              borderColor: errorOtp !== '' ? 'red' : ''
            }
          }}
        />
        {errorOtp && (
          <Box sx={{ pt: 1 }}>
            <FormHelperText
              id='my-helper-text'
              sx={{ fontSize: 12, m: 'unset', pb: 2, color: 'red', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5 }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 20 }} />
              {errorOtp}
            </FormHelperText>
          </Box>
        )}
        {errorApi && (
          <FormHelperText
            id='api-helper-text2'
            sx={{ fontSize: 12, m: 'unset', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5, pt: 1, color: 'red' }}
          >
            <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
            Lỗi: {errorApi}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ inlineSize: '100%', pb: 2, pl: 5, pr: 5 }} error={!!error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1 }}>Mật khẩu mới</Box>
        <Input
          id='my-input'
          aria-describedby='my-helper-text'
          type={visible ? 'password' : 'text'}
          value={password}
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
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setVisible(!visible)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    'color': (theme) => theme.palette.neutral.neutral1,
                    '&:hover': (theme) => theme.palette.secondary4.main
                  }
                }}
              >
                {visible ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1, pt: 1 }}>Mật khẩu của bạn phải có ít nhất</Box>
        <Box
          sx={{
            'fontSize': 14,
            'pb': 1,
            '& .MuiSvgIcon-root': {
              fontSize: 14
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: check1 === false && check1 !== null ? 'red' : '' }}>
            {!check1 ? <Brightness1OutlinedIcon /> : <CheckCircleRoundedIcon sx={{ color: (theme) => theme.palette.primary.main }} />}1 chữ cái
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: check2 === false && check2 !== null ? 'red' : '' }}>
            {!check2 ? <Brightness1OutlinedIcon /> : <CheckCircleRoundedIcon sx={{ color: (theme) => theme.palette.primary.main }} />}1 chữ số hoặc ký
            tự đặc biệt (ví dụ: #?!&)
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: check3 === false && check3 !== null ? 'red' : '' }}>
            {!check3 ? <Brightness1OutlinedIcon /> : <CheckCircleRoundedIcon sx={{ color: (theme) => theme.palette.primary.main }} />}
            10 ký tự
          </Box>
        </Box>
      </FormControl>
      <FormControl sx={{ inlineSize: '100%', pb: 2, pl: 5, pr: 5 }} error={!!error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1 }}>Nhập lại mật khẩu mới </Box>
        <Input
          id='my-input-1'
          aria-describedby='my-helper-text'
          type={visible2 ? 'password' : 'text'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if ((e.target.value as string) === password) setError('')
          }}
          sx={{
            'borderColor': error !== '' ? 'red' : '',
            '&:hover': {
              borderColor: error !== '' ? 'red' : ''
            },
            '&.Mui-focused': {
              borderColor: error !== '' ? 'red' : ''
            }
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setVisible2(!visible2)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    'color': (theme) => theme.palette.neutral.neutral1,
                    '&:hover': (theme) => theme.palette.secondary4.main
                  }
                }}
              >
                {visible ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {error && (
        <Box sx={{ pt: 1 }}>
          <FormHelperText
            id='my-helper-text'
            sx={{ fontSize: 12, m: 'unset', pb: 2, color: 'red', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5 }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 20 }} />
            Kiểm tra lại mật khẩu đã nhập
          </FormHelperText>
        </Box>
      )}
      {!isPending && (
        <Button sx={{ inlineSize: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Tạo mật khẩu
        </Button>
      )}

      {isPending && <CircularProgress color='success' />}
    </Box>
  )
}
