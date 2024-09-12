import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '~/assets/icon/GoogleIcon.svg?react'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import useLogin from '~/hooks/Auth/useLogin'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoginBody() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)
  const { mutate: login, isPending } = useLogin()

  const navigate = useNavigate()

  const handleChangeEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
  }

  const handleChangePassword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
  }

  const handleNext = () => {
    if (password === '') setError('Mật khẩu không được bỏ trống')
    else if (error === 'Email hoặc mật khẩu không đúng') {
      setError('')
    } else if (password !== '' && error === '') {
      login(
        { email, password },
        {
          onError: () => {
            setError('Email hoặc mật khẩu không đúng')
          }
        }
      )
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: '0px 32px' }}>
      <Typography variant='h4' fontWeight='bold' sx={{ textAlign: 'center', mb: '40px' }}>
        Đăng nhập với MagicMusic
      </Typography>
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
      <Divider sx={{ width: '100%', bgcolor: (theme) => theme.palette.neutral.neutral2, mt: 5, mb: 5 }} />
      <FormControl sx={{ width: '100%', pb: 2 }}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1 }}>Địa chỉ email</Box>
        <Input id='my-input1' aria-describedby='my-helper-text' placeholder='name@domain.com' value={email} onChange={handleChangeEmail} />
      </FormControl>
      <FormControl sx={{ width: '100%', pb: 2 }}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1, pt: 1 }}>Mật khẩu</Box>
        <Input
          id='my-input2'
          aria-describedby='my-helper-text'
          type={visible ? 'password' : 'text'}
          value={password}
          onChange={handleChangePassword}
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
      </FormControl>
      {error && (
        <Box
          id='my-helper-text'
          sx={{ fontSize: 12, m: 'unset', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5, pb: 1, color: 'red' }}
        >
          <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
          {error}
        </Box>
      )}
      {!isPending && (
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Đăng nhập
        </Button>
      )}
      {isPending && <CircularProgress color='success' />}
      <Box
        sx={{
          'pt': 2,
          'pb': 2,
          'fontSize': 15,
          'color': (theme) => theme.palette.secondary4.main,
          'textDecoration': 'underline',
          'cursor': 'pointer',
          '&:hover': {
            color: (theme) => theme.palette.primary.main
          }
        }}
        onClick={() => navigate('/reset-password')}
      >
        Quên mật khẩu của bạn?
      </Box>
      <Box sx={{ width: '100%', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Box sx={{ color: (theme) => theme.palette.neutral.neutral2 }}>Bạn chưa có tài khoản?</Box>
        <Box
          sx={{
            'color': (theme) => theme.palette.secondary4.main,
            'cursor': 'pointer',
            'textDecoration': 'underline',
            '&:hover': {
              color: (theme) => theme.palette.primary.main
            }
          }}
          onClick={() => navigate('/register')}
        >
          Đăng ký MagicMusic
        </Box>
      </Box>
    </Box>
  )
}
