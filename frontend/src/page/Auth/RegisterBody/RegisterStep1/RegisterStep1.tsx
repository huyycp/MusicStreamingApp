import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import * as Yup from 'yup'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import { registerSchema } from '~/validate/registerValidate'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 2,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.neutral.neutral1
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}))

export default function RegisterStep1() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email as string
  const [visible, setVisible] = useState(true)
  const [check1, setCheck1] = useState<boolean | null>(null)
  const [check2, setCheck2] = useState<boolean | null>(null)
  const [check3, setCheck3] = useState<boolean | null>(null)
  useEffect(() => {
    if (!email) navigate('/register')
  })
  useEffect(() => {
    document.title = 'Magic Music - Register: Step 1'
  }, [])

  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
    setCheck1(/[a-zA-Z]/.test(value))
    setCheck2(/[\d!?#&]/.test(value))
    setCheck3(value.length >= 10)

    try {
      await registerSchema.validate({ password: value }, { abortEarly: false })
      setError('')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const passwordError = err.errors.find((error) => error.includes('Mật khẩu'))
        setError(passwordError || '')
      }
    }
  }
  const handleNext = () => {
    if (password === '') setError('Mật khẩu không được bỏ trống')
    else if (password !== '' && error === '') {
      navigate('/register/step2', { state: { email, password } })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BorderLinearProgress variant='determinate' value={Math.floor((1 / 4) * 100)} sx={{ width: '100%', mt: 0.5 }} />
      <Box sx={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
        <ArrowBackIosNewIcon
          sx={{
            'cursor': 'pointer',
            'height': '100%',
            'width': '56px',
            'padding': '16px',
            'color': (theme) => theme.palette.neutral.neutral2,
            '&:hover': {
              color: (theme) => theme.palette.secondary4.main
            }
          }}
          onClick={() => {
            navigate('/register')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 1/4</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Tạo Mật Khẩu</Box>
        </Box>
      </Box>
      <FormControl sx={{ width: '100%', pb: 2, pl: 5, pr: 5 }} error={!!error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1 }}>Mật khẩu</Box>
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
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pb: 1, pt: 2 }}>Mật khẩu của bạn phải có ít nhất</Box>
        <Box
          sx={{
            'fontSize': 14,
            'pb': 4,
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
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Tiếp theo
        </Button>
      </FormControl>
    </Box>
  )
}
