import React, { useState } from 'react'
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import './Login.css'
import { apiLogin } from './Auth/LoginAPI.ts'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { toast } from 'react-toastify'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('letixi1419@barakal.com')
  const [password, setPassword] = useState<string>('abcd12345!')
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      toast.error('Vui lòng điền đầy đủ thông tin.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Địa chỉ email không hợp lệ..')
      return
    }

    if (password.length < 8) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự.')
      return
    }

    setLoading(true)

    try {
      const data = await apiLogin({
        email: email,
        password: password
      })

      if (!data.result) {
        throw new Error('Incorrect username or password.')
      }

      const { access_token, refresh_token } = data.result
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      toast.success('Login successfully!')
      navigate('/')
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Incorrect username or password.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='tam'>
      <div className='body'>
        <div className='wp'>
          <div className='imgLogin'>
            <img src='src/assets/img/IMG_Login.jpg' alt='' />
          </div>
          <div className='bgLogin'>
            <div className='logoLogin'>
              <img className='logo' src='src/assets/img/Logo.png' alt='' />
            </div>
            <div className='titleLogin'>Log in to Magic Music</div>

            <div className='contentLogin'>
              <div className='login'>
                <div className='box'>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    sx={{
                      'width': '300px',
                      'input': { color: '#ffffff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ffffff' },
                        '&:hover fieldset': { borderColor: '#ffffff' },
                        '&.Mui-focused fieldset': { borderColor: '#ffffff' }
                      }
                    }}
                  />
                </div>
                <div className='box'>
                  <FormControl sx={{ m: 1, width: '300px', marginLeft: '0px' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password' style={{ color: '#ffffff' }}>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                            edge='end'
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <VisibilityOffOutlined sx={{ color: '#ffffff' }} /> : <VisibilityOutlined sx={{ color: '#ffffff' }} />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                      sx={{
                        'width': '300px',
                        'input': { color: '#ffffff' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' }
                      }}
                    />
                  </FormControl>
                  {/* {error && <div className='error'>{error}</div>} */}
                </div>
                <div>
                  <Button
                    variant='contained'
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{
                      'width': '300px',
                      'backgroundColor': 'var(--main-color)',
                      'borderRadius': '25px',
                      '&:hover': {
                        backgroundColor: 'var(--main-color)',
                        transform: 'scale(1.04)'
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#b0b0b0',
                        color: '#ffffff'
                      }
                    }}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
